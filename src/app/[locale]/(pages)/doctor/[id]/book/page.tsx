"use client";
import React from "react";

import FileDropzone from "@/components/dragDrop";
import IconButton from "@/components/iconButton";
import MyModal from "@/components/modal";
import Textfield from "@/components/textField";
import {
  BackIcon,
  CalendarIcon,
  DoubleCheckIcon,
  LocationIcon,
  NextIcon,
} from "@/icons/page";
import { truncateText } from "@/utils/letterLimitation";
import Image from "next/image";
import Link from "next/link";
import DoctorAvailable from "@/components/doctorAvailable";
import { useParams } from "next/navigation";
import { useFetchDoctorByIdPublic } from "@/lib/doctor/useFetchDoctor";

export default function BookingPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const { data } = useFetchDoctorByIdPublic({ id: id as string });
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  // const [timeSlots, setTimeSlots] = React.useState<Array<string>>([]);
  const [timeSlots, setTimeSlots] = React.useState<Array<string>>([]);
  const handleFileUpload = (files: File[]) => {
    console.log("Uploaded files:", files);
  };
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSaveSelectedTimeSlots = (selectedSlots: string[]) => {
    setTimeSlots((prevSlots) => [...prevSlots, ...selectedSlots]);
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots((prevSlots) => prevSlots.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container bg-white rounded p-4 text-b_text mt-2">
        <h4 className="text-b_text text-sm mb-3 font-bold">
          Fill in information for making appointment:
        </h4>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="w-full sm:w-3/5 shadow-md rounded py-6 border-t border-gray-100">
            <form
              action=""
              className="px-4 flex items-start justify-start flex-col gap-4"
            >
              <IconButton
                className="rounded text-xs text-secondary border p-2 w-full"
                icon={<CalendarIcon />}
                isFront={true}
                type="button"
                title="Choose appoinment date and time"
                onClick={() => handleOpenModal()}
              />
              <div>
                {timeSlots.length > 0 ? (
                  timeSlots.map((val, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <p>{val}</p>
                      <button
                        onClick={() => removeTimeSlot(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No time slots selected</p> // To confirm the section is rendering
                )}
              </div>

              <Textfield
                name="case"
                placeholder="Enter case...."
                id="case"
                title="Case"
                required
                color="text-b_text"
                // onChange={handleSignUp}
              />
              <Textfield
                name="description"
                placeholder="Enter description...."
                id="description"
                title="Description"
                color="text-b_text"
                multiline={true}
                rows={4}
                // onChange={handleSignUp}
              />
              <FileDropzone onFileUpload={handleFileUpload} />
              <div className="flex items-center justify-between gap-2 w-2/4">
                <IconButton
                  className="rounded text-base w-full mt-4 text-xs border"
                  icon={<BackIcon />}
                  isFront={true}
                  type="button"
                  title="Back"
                  // onClick={() => router.push("/signin")}
                />
                <IconButton
                  className="rounded text-white bg-base w-full mt-4 text-xs"
                  icon={<NextIcon size={18} />}
                  isFront={false}
                  title="Submit"
                  type="submit"
                />
              </div>
            </form>
          </div>
          <div className="w-full sm:w-2/5 shadow-md p-4 rounded border-t border-gray-100">
            <div className="flex items-start justify-start flex-col select-none gap-2 w-full rounded">
              <div className="bg-white rounded flex items-center justify-center flex-col gap-2">
                <Link href="">
                  <Image
                    className="max-w-full h-auto rounded-full shadow-md"
                    src={
                      data?.profile
                        ? data?.profile
                        : "/images/default-image.webp"
                    }
                    alt=""
                    width={150}
                    height={150}
                  />
                </Link>
                <div className="p-3 w-full">
                  <div className="w-full flex-col sm:flex items-center justify-start">
                    <h5 className="text-sm sm:text-md mb-2 text-secondary font-bold tracking-tight mr-2">
                      {data?.firstName}&nbsp;{data?.lastName}
                    </h5>
                  </div>
                  <p className="w-full hidden sm:block mt-3 font-normal text-xs text-b_text">
                    {truncateText(data?.bio || "", 70)}
                  </p>
                  <div className="border w-full flex items-center justify-between">
                    <p className="flex items-start justify-start mb-3 font-normal text-xs text-b_text mt-4 mb-4">
                      <LocationIcon size={18} />
                      &nbsp;{data?.address1}
                    </p>
                    <IconButton
                      className="rounded text-xs text-secondary border p-2 w-3/5"
                      icon={<CalendarIcon />}
                      isFront={true}
                      type="button"
                      title="Availability"
                      onClick={() => handleOpenModal()}
                    />
                  </div>
                  <div className="w-full flex items-start justify-start flex-col gap-2 mt-4">
                    <h4 className="text-b_text text-sm mb-3 font-bold">
                      Subspecialities:
                    </h4>
                    {/* {data?.doctorSpecialists &&
                    data?.doctorSpecialists.length > 0 ? (
                      data?.doctorSpecialists?.map((row, index: number) => {
                        return (
                          <ul
                            key={index + 1}
                            className="flex items-start justify-center flex-col gap-4"
                          >
                            <li className="flex items-center justify-start text-b_text text-xs">
                              <DoubleCheckIcon
                                className="text-base"
                                size={20}
                              />
                              &nbsp;{row?.name}
                            </li>
                          </ul>
                        );
                      })
                    ) : (
                      <div className="text-b-text w-full text-center">
                        No data from database!
                      </div>
                    )} */}
                  </div>
                  <IconButton
                    className="rounded text-white bg-base w-full mt-4 text-xs"
                    icon={<NextIcon size={18} />}
                    isFront={false}
                    title="More detail"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MyModal
        isOpen={isOpenModal}
        onClose={handleOpenModal}
        className="h-[10vh] fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-11/12 sm:w-3/5 md:inset-0 h-auto shadow"
      >
        <DoctorAvailable
          id={id || ""}
          onSave={(selectedSlots) => handleSaveSelectedTimeSlots(selectedSlots)}
          onClose={handleOpenModal}
        />
      </MyModal>
    </div>
  );
}
