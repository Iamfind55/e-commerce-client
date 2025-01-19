"use client";

import React from "react";
import Breadcrumb from "@/components/breadCrumb";
import CustomerReportCard from "@/components/customerReportCard";
import DeleteModal from "@/components/deleteModal";
import MyModal from "@/components/modal";
import { v4 as uuidv4 } from "uuid";
import DropdownComponent from "@/components/dropdown";
import { CancelIcon, PlusIcon, SaveIcon, SettingIcon } from "@/icons/page";
import { useTranslations } from "next-intl";
import Textfield from "@/components/textField";
import Select from "@/components/select";
import { countries } from "@/utils/option";
import IconButton from "@/components/iconButton";
import Loading from "@/components/loading";

export type ReportItem = {
  title: string;
  amount: number;
  detail: string;
};

type AddressData = {
  id: string;
  isDefault: boolean;
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
    isDefault: true,
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
    isDefault: false,
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

export default function InstrumentPanel() {
  const reportItems: ReportItem[] = [
    {
      title: "Products",
      amount: 5,
      detail: "In your shipping cart",
    },
    {
      title: "Products",
      amount: 15,
      detail: "In your orders",
    },
    {
      title: "Products",
      amount: 25,
      detail: "You ordered",
    },
  ];

  const t = useTranslations("myCartPage");
  const g = useTranslations("global");

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
    isDefault: false,
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
      isDefault: false,
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
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <Breadcrumb
          items={[
            { label: "Customer", value: "/customer" },
            { label: "Instrument panel", value: "/instrucment-panel" },
          ]}
        />
        <div className="w-full flex items-start justify-between gap-4 mt-4">
          {reportItems.map((item) => (
            <CustomerReportCard key={item.detail} {...item} />
          ))}
        </div>
        <div className="bg-white w-full flex items-start justify-start flex-col gap-4 mt-4 p-4 rounded">
          <p className="w-full text-sm text-gray-500 border-b border-gray-200 pb-1">
            Set default shipping address:
          </p>
          <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
            {addressData.map((row) => (
              <div
                key={row.id}
                className={`relative border rounded ${
                  row.isDefault && "border-neon_pink bg-red-100"
                } p-4 h-62 flex items-start justify-center flex-col gap-1 text-gray-400`}
              >
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
                        className="w-full text-xs flex items-center justify-start text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4"
                      >
                        Set as default
                      </button>
                      <button
                        onClick={() => handleEdit(row)}
                        className="w-full text-xs flex items-center justify-start text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4"
                      >
                        {g("_edit_button")}
                      </button>
                      <button
                        onClick={() => {
                          handleOpenDeleteModal();
                          setDeleteTargetId(row?.id);
                        }}
                        className="w-full text-xs flex items-center justify-start text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4"
                      >
                        {g("_delete_button")}
                      </button>
                    </div>
                  </DropdownComponent>
                </div>

                {/* Address Details */}
                <p className="text-xs text-gray-500 flex items-start justify-start gap-1 mt-4">
                  {g("_address")}:
                  <strong className="text-black font-bold">
                    {row.address}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_postal_code")}:
                  <strong className="text-black font-bold">
                    {row.postal_code}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_city")}:
                  <strong className="text-black font-bold">
                    {row.district}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_province")}:
                  <strong className="text-black font-bold">
                    {row.province}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_country")}:
                  <strong className="text-black font-bold">
                    {row.country}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_telephone")}:
                  <strong className="text-black font-bold">
                    {row.phone_number}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_email")}:
                  <strong className="text-black font-bold">{row.email}</strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_contact_person")}:
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
                  isDefault: false,
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
              <p className="text-sm">{t("_add_new_address")}</p>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Address */}
      <MyModal
        isOpen={isOpenModal}
        onClose={handleOpenModal}
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-2/5 md:inset-0 h-auto shadow"
      >
        <div className="rounded bg-white w-full p-4">
          <h4 className="text-gray-500 text-sm mb-3 font-bold">
            {isUpdate ? t("_update_address_title") : t("_add_address_title")}
          </h4>
          <form
            className="w-full flex items-start justify-start flex-col gap-2"
            onSubmit={handleSubmitForm}
          >
            <Textfield
              name="address"
              placeholder={t("_address_placeholder")}
              id="address"
              title={t("_address")}
              value={formData.address}
              onChange={handleInputChange}
              required
              multiline
              rows={2}
            />
            <div className="w-full grid grid-cols-2 gap-2 lg:grid-cols-2">
              <Select
                name="country"
                title={g("_country")}
                option={countries}
                value={formData.country}
                onChange={handleInputChange}
              />
              <Select
                name="province"
                title={g("_province")}
                option={countries}
                value={formData.province}
                onChange={handleInputChange}
              />
              <Select
                name="district"
                title={g("_city")}
                option={countries}
                value={formData.district}
                onChange={handleInputChange}
              />
              <Textfield
                name="postal_code"
                placeholder={g("_postal_code_placeholder")}
                id="postal_code"
                title={g("_postal_code")}
                value={formData.postal_code}
                onChange={handleInputChange}
                required
              />
            </div>
            <Textfield
              name="contact_person"
              placeholder={g("_contact_person_placeholder")}
              id="contact_person"
              title={g("_contact_person")}
              value={formData.contact_person}
              onChange={handleInputChange}
              required
            />
            <Textfield
              name="email"
              placeholder={g("_email_placeholder")}
              id="email"
              title={g("_email")}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Textfield
              name="phone_number"
              placeholder={g("_telephone_placeholder")}
              id="phone_number"
              title={g("_telephone")}
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
            <div className="w-full flex items-center justify-start gap-4">
              <IconButton
                className="rounded border text-gray-500 p-2 w-full text-xs"
                icon={<CancelIcon />}
                isFront={true}
                type="button"
                title={g("_close_button")}
                onClick={handleOpenModal}
              />
              <IconButton
                className="rounded text-white p-2 bg-neon_pink w-full text-xs"
                icon={isLoading ? <Loading /> : <SaveIcon size={16} />}
                isFront={true}
                title={isLoading ? g("_saving_button") : g("_save_button")}
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
