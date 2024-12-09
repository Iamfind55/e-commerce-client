"use client";
import React from "react";

import Breadcrumb from "@/components/breadCrumb";
import FileDropzone from "@/components/dragDrop";
import IconButton from "@/components/iconButton";
import MyModal from "@/components/modal";
import Textfield from "@/components/textField";
import {
  BackIcon,
  CalendarIcon,
  CancelIcon,
  DoubleCheckIcon,
  LocationIcon,
  NextIcon,
} from "@/icons/page";
import { truncateText } from "@/utils/letterLimitation";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useFetchDoctorByIdPublic } from "@/lib/doctor/useFetchDoctor";
import DoctorAvailable from "@/components/doctorAvailable";
import { IAppointmentTypes } from "@/types/appointment";
import { useToast } from "@/utils/toast";
import MessageHandler from "@/components/messageHandler";
import { convertTo24HourFormat } from "@/utils/timeCalculate";
import Loading from "@/components/loading";

export default function BookingPage() {
  const router = useRouter();
  const { errorMessage } = useToast();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const { data } = useFetchDoctorByIdPublic({ id: id as string });
  console.log(data);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [timeSlots, setTimeSlots] = React.useState<Array<string>>([]);
  const [date, setDate] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [scheduleId, setScheduleId] = React.useState<string>("");
  const [createData, setCreateData] = React.useState<IAppointmentTypes>({
    doctorId: "",
    scheduleId: "",
    date: "",
    startTime: "",
    endTime: "",
    urgency: "",
    case: "",
    notes: "",
    images: "",
  });
  const handleMakeAppointment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateData({ ...createData, [e.target.name]: e.target.value });
  };

  // Function to handle file uploads and update the state
  const handleFileUpload = (files: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSaveSelectedTimeSlots = (
    selectedSlots: string[],
    date: string,
    id: string
  ) => {
    setDate(date);
    setTimeSlots((prevSlots) => [...prevSlots, ...selectedSlots]);
    setScheduleId(id);
    handleOpenModal();
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots((prevSlots) => prevSlots.filter((_, i) => i !== index));
  };

  const parseTimeRange = (timeRange: string) => {
    const [start, end] = timeRange.split(" - ");
    const start24 = convertTo24HourFormat(start);
    const end24 = convertTo24HourFormat(end);
    return { start24, end24 };
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      for (const slot of timeSlots) {
        const { start24, end24 } = parseTimeRange(slot);
        let body: FormData | string;
        const endpoint = uploadedFiles[0]
          ? "/appointments/options"
          : "/appointments";

        if (uploadedFiles[0]) {
          const formData = new FormData();
          formData.append("date", date);
          formData.append("startTime", start24);
          formData.append("endTime", end24);
          formData.append("doctorId", id || "");
          formData.append("scheduleId", scheduleId);
          formData.append("case", createData?.case || "");
          formData.append("notes", createData?.notes || "");
          formData.append("urgency", "low");
          formData.append("images", uploadedFiles[0], uploadedFiles[0].name);
          body = formData;
        } else {
          body = JSON.stringify({
            date: date,
            startTime: start24,
            endTime: end24,
            doctorId: id,
            scheduleId: scheduleId,
            case: createData?.case || "",
            notes: createData?.notes || "",
            urgency: "low",
          });
        }

        const res = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
          {
            method: "POST",
            body: body,
            credentials: "include",
            headers: uploadedFiles[0]
              ? undefined
              : { "Content-Type": "application/json" },
          }
        ).then((response) => response.json());
        setResponse(res);
        if (res?.status === 201) {
          router.push("/client/doctor/" + res?.data?.id + "/bill");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <Breadcrumb path="Doctor/appointment" /> */}
      <div className="bg-white rounded p-4 shadow-md text-b_text mt-2">
        <h4 className="text-b_text text-sm mb-3 font-bold">
          Fill in information for making appointment:
        </h4>
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          <div className="w-full sm:w-3/5 sm:shadow-md rounded py-2 sm:py-6 sm:border-t sm:border-gray-100">
            <form
              action=""
              className="px-0 sm:px-4 flex items-start justify-start flex-col gap-0 sm:gap-2"
              onSubmit={handleSubmitForm}
            >
              <IconButton
                className="hover:animate-none rounded text-xs text-secondary border p-1 sm:p-2 w-full sm:w-auto mb-2 sm:mb-0"
                icon={<CalendarIcon />}
                isFront={true}
                type="button"
                title="Choose appoinment date and time"
                onClick={() => handleOpenModal()}
              />
              <div className="flex items-start justify-start flex-col gap-4 w-full">
                {timeSlots.length > 0 &&
                  timeSlots.map((val, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 pl-4 w-2/4"
                    >
                      <p className="text-xs">
                        {index + 1}. &nbsp;{date}&nbsp; ({val})
                      </p>
                      <CancelIcon
                        onClick={() => removeTimeSlot(index)}
                        className="text-error text-sm cursor-pointer"
                      />
                    </div>
                  ))}
              </div>
              <Textfield
                name="case"
                placeholder="Enter case...."
                id="case"
                title="Case"
                required
                color="text-b_text"
                onChange={handleMakeAppointment}
              />
              <Textfield
                name="notes"
                placeholder="Enter description...."
                id="notes"
                title="Description"
                color="text-b_text"
                multiline={true}
                rows={4}
                onChange={handleMakeAppointment}
              />
              <FileDropzone onFileUpload={handleFileUpload} />
              <div className="flex items-center justify-between gap-2 w-full">
                <IconButton
                  className="rounded text-base w-full mt-0 sm:mt-4 text-xs border"
                  icon={<BackIcon />}
                  isFront={true}
                  type="button"
                  title="Back"
                  onClick={() => router.back()}
                />
                <IconButton
                  className="rounded text-white bg-base w-full mt-0 sm:mt-4 text-xs"
                  icon={isLoading ? <Loading /> : <NextIcon size={18} />}
                  isFront={isLoading ? true : false}
                  title={isLoading ? "Saving" : "Submit"}
                  type="submit"
                />
              </div>
            </form>
          </div>
          <div className="hidden sm:block w-2/5 shadow-md p-4 rounded border-t border-gray-100">
            <div className="flex items-start justify-start flex-col select-none gap-2 w-full rounded">
              <div className="bg-white rounded flex items-center justify-center flex-col gap-2">
                <Link href="">
                  <Image
                    className="rounded-full shadow-md"
                    src={data?.profile ?? "/images/default-image.webp"}
                    alt=""
                    width={150}
                    height={150}
                  />
                </Link>
                <div className="p-3 w-full">
                  <div className="flex-col sm:flex items-center justify-start">
                    <h5 className="text-sm sm:text-md mb-2 text-secondary font-bold tracking-tight mr-2">
                      {data?.firstName}&nbsp;{data?.lastName}
                    </h5>
                  </div>
                  <p className="hidden sm:block mt-3 font-normal text-xs text-b_text">
                    {truncateText(data?.bio || "", 70)}
                  </p>
                  <div className="flex items-center justify-between">
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
                    {data?.specialties && data.specialties.length > 0 && (
                      <h4 className="text-b_text text-sm mb-3 font-bold">
                        Subspecialities:
                      </h4>
                    )}
                    {data?.specialties &&
                      data?.specialties?.map((val, index) => (
                        <ul
                          className="flex items-start justify-center flex-col gap-4"
                          key={index + 1}
                        >
                          <li className="flex items-center justify-start text-b_text text-xs">
                            <DoubleCheckIcon className="text-base" size={20} />
                            &nbsp;{val.name}
                          </li>
                        </ul>
                      ))}
                  </div>
                  <IconButton
                    className="rounded text-white bg-base w-full mt-4 text-xs"
                    icon={<NextIcon size={18} />}
                    isFront={false}
                    title="More detail"
                    onClick={() => router.push(`/client/doctor/${data?.id}`)}
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
        className="h-[10vh] fixed -top-8 sm:top-0 right-0 left-0 z-99999999 flex justify-center items-center w-11/12 sm:w-3/5 md:inset-0 h-auto shadow"
      >
        <DoctorAvailable
          id={id || ""}
          onSave={(selectedSlots, formattedDate, scheduleId) =>
            handleSaveSelectedTimeSlots(
              selectedSlots,
              formattedDate,
              scheduleId
            )
          }
          onClose={handleOpenModal}
        />
      </MyModal>

      {response && <MessageHandler response={response} />}
    </div>
  );
}
