"use client";
import { v4 as uuidv4 } from "uuid"; // Import a UUID generator
import DeleteModal from "@/components/deleteModal";
import DropdownComponent from "@/components/dropdown";
import IconButton from "@/components/iconButton";
import Loading from "@/components/loading";
import MyModal from "@/components/modal";
import Select from "@/components/select";
import Textfield from "@/components/textField";

import {
  CancelIcon,
  EditIcon,
  PlusIcon,
  SaveIcon,
  SettingIcon,
  TrashIcon,
} from "@/icons/page";
import { countries } from "@/utils/option";
import React from "react";

type AddressData = {
  id: string;
  address: string;
  country: string;
  province: string;
  district: string;
  postal_code: string;
  contact_person: string;
  email: string;
  phone_number: string;
};

const initialAddressData: AddressData[] = [
  {
    id: "12345678",
    address: "123 Main Street, Downtown",
    country: "United States",
    province: "California",
    district: "Los Angeles",
    postal_code: "90001",
    contact_person: "John Doe",
    email: "john.doe@example.com",
    phone_number: "+1 123-456-7890",
  },
  {
    id: "123456789",
    address: "456 Elm Street, Uptown",
    country: "Canada",
    province: "Ontario",
    district: "Toronto",
    postal_code: "M5H 2N2",
    contact_person: "Jane Smith",
    email: "jane.smith@example.ca",
    phone_number: "+1 987-654-3210",
  },
];

export default function ShippingInformation() {
  const [addressData, setAddressData] =
    React.useState<AddressData[]>(initialAddressData);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null
  );

  const [formData, setFormData] = React.useState<AddressData>({
    id: "",
    address: "",
    country: "",
    province: "",
    district: "",
    postal_code: "",
    contact_person: "",
    email: "",
    phone_number: "",
  });

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleOpenDeleteModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (isUpdate) {
      setAddressData((prev) =>
        prev.map((item) => (item.id === formData.id ? formData : item))
      );
    } else {
      setAddressData((prev) => [...prev, { ...formData, id: uuidv4() }]);
    }

    setIsLoading(false);
    setIsOpenModal(false);
    setFormData({
      id: "",
      address: "",
      country: "",
      province: "",
      district: "",
      postal_code: "",
      contact_person: "",
      email: "",
      phone_number: "",
    });
  };

  const handleEdit = (row: AddressData) => {
    setFormData(row);
    setIsUpdate(true);
    handleOpenModal();
  };

  const handleDeleteAddress = () => {
    if (deleteTargetId) {
      const updatedData = addressData.filter(
        (address) => address.id !== deleteTargetId
      );
      setAddressData(updatedData);
      setDeleteTargetId(null);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
        {addressData.map((row, index: number) => (
          <div
            key={index + 1}
            className="relative border rounded border-dotted p-4 h-62 flex items-start justify-center flex-col gap-1 text-gray-400"
          >
            <input
              type="checkbox"
              name="address"
              className="absolute top-2 left-2"
            />

            <div className="absolute top-2 right-2 text-gray-500 hover:text-black">
              <DropdownComponent
                className="w-56 cursor-pointer"
                head={
                  <div className="flex items-start justify-start gap-1 text-white text-sm cursor-pointer hover:text-neon_pink">
                    <SettingIcon
                      size={20}
                      className="cursor-pointer text-second_black hover:text-neon_pink"
                    />
                  </div>
                }
              >
                <div
                  id="dropdownDivider"
                  className="py-4 flex items-start flex-col"
                >
                  <button
                    onClick={() => handleEdit(row)}
                    className="w-full text-sm flex items-center justify-start text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4"
                  >
                    <EditIcon size={16} className="text-gray-500" />
                    &nbsp; Edit
                  </button>
                  <button
                    onClick={() => {
                      handleOpenDeleteModal();
                      setDeleteTargetId(row?.id);
                    }}
                    className="w-full text-sm flex items-center justify-start text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4"
                  >
                    <TrashIcon size={16} className="text-gray-500" />
                    &nbsp; Delete
                  </button>
                </div>
              </DropdownComponent>
            </div>

            {/* Address Details */}
            <p className="text-xs text-gray-500 flex items-start justify-start gap-1 mt-4">
              Address:
              <strong className="text-black font-bold">{row.address}</strong>
            </p>
            <p className="text-xs text-gray-500">
              Postal code:
              <strong className="text-black font-bold">
                {row.postal_code}
              </strong>
            </p>
            <p className="text-xs text-gray-500">
              City:{" "}
              <strong className="text-black font-bold">{row.district}</strong>
            </p>
            <p className="text-xs text-gray-500">
              Province:
              <strong className="text-black font-bold">{row.province}</strong>
            </p>
            <p className="text-xs text-gray-500">
              Country:
              <strong className="text-black font-bold">{row.country}</strong>
            </p>
            <p className="text-xs text-gray-500">
              Telephone:
              <strong className="text-black font-bold">
                {row.phone_number}
              </strong>
            </p>
            <p className="text-xs text-gray-500">
              Email:{" "}
              <strong className="text-black font-bold">{row.email}</strong>
            </p>
            <p className="text-xs text-gray-500">
              Contact person:
              <strong className="text-black font-bold">
                {row.contact_person}
              </strong>
            </p>
          </div>
        ))}

        {/* Add New Address Button */}
        <button
          onClick={() => {
            setIsUpdate(false);
            setFormData({
              id: "",
              address: "",
              country: "",
              province: "",
              district: "",
              postal_code: "",
              contact_person: "",
              email: "",
              phone_number: "",
            });
            handleOpenModal();
          }}
          className="border rounded border-dotted p-4 h-56 flex items-center justify-center flex-col gap-1 text-gray-400"
        >
          <PlusIcon size={24} />
          <p>Add new address</p>
        </button>
      </div>

      {/* Modal for Add/Edit Address */}
      <MyModal
        isOpen={isOpenModal}
        onClose={handleOpenModal}
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-2/5 md:inset-0 h-auto shadow"
      >
        <div className="rounded bg-white w-full p-4">
          <h4 className="text-gray-500 text-sm mb-3 font-bold">
            {isUpdate ? "Update address data!" : "Create new address!"}
          </h4>
          <form
            className="w-full flex items-start justify-start flex-col gap-2"
            onSubmit={handleSubmitForm}
          >
            <Textfield
              name="address"
              placeholder="Enter address..."
              id="address"
              title="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              multiline
              rows={2}
            />
            <div className="w-full grid grid-cols-2 gap-2 lg:grid-cols-2">
              <Select
                name="country"
                title="Country"
                option={countries}
                value={formData.country}
                onChange={handleInputChange}
              />
              <Select
                name="province"
                title="Province"
                option={countries}
                value={formData.province}
                onChange={handleInputChange}
              />
              <Select
                name="district"
                title="City"
                option={countries}
                value={formData.district}
                onChange={handleInputChange}
              />
              <Textfield
                name="postal_code"
                placeholder="Enter postal code..."
                id="postal_code"
                title="Postal code"
                value={formData.postal_code}
                onChange={handleInputChange}
                required
              />
            </div>
            <Textfield
              name="contact_person"
              placeholder="Enter contact person..."
              id="contact_person"
              title="Contact person"
              value={formData.contact_person}
              onChange={handleInputChange}
              required
            />
            <Textfield
              name="email"
              placeholder="Enter email..."
              id="email"
              title="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Textfield
              name="phone_number"
              placeholder="Enter phone number..."
              id="phone_number"
              title="Phone number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
            <div className="w-full flex items-center justify-start gap-4">
              <IconButton
                className="rounded bg-neon_pink p-2 w-full text-white text-xs"
                icon={<CancelIcon />}
                isFront={true}
                type="button"
                title="Close"
                onClick={handleOpenModal}
              />
              <IconButton
                className="rounded text-white p-2 bg-neon_blue w-full text-xs"
                icon={isLoading ? <Loading /> : <SaveIcon size={16} />}
                isFront={true}
                title={isLoading ? "Saving..." : "Save change"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </MyModal>

      <DeleteModal
        isOpen={isOpen}
        onClose={handleOpenDeleteModal}
        onConfirm={() => handleDeleteAddress()}
      />
    </>
  );
}
