"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { useLazyQuery, useMutation } from "@apollo/client";

// components
import MyModal from "@/components/modal";
import Select from "@/components/select";
import Loading from "@/components/loading";
import Textfield from "@/components/textField";
import IconButton from "@/components/iconButton";
import DeleteModal from "@/components/deleteModal";
import DropdownComponent from "@/components/dropdown";

// icons and images
import { CancelIcon, PlusIcon, SaveIcon, SettingIcon } from "@/icons/page";

// APIs
import { QUERY_CITIES, QUERY_COUNTRIES, QUERY_STATES } from "@/api/country";
import {
  MUTATION_CREATE_CUSTOMER_ADDRESS,
  MUTATION_DELETE_CUSTOMER_ADDRESS,
  MUTATION_SET_DEFAULT_ADDRESS,
  MUTATION_UPDATE_CUSTOMER_ADDRESS,
  QUERY_CUSTOMER_ADDRESS,
} from "@/api/address";

// utils, hooks and types
import {
  GetCityResponse,
  GetCountryResponse,
  GetStateResponse,
} from "@/types/country";
import { useToast } from "@/utils/toast";
import { CustomerAddress, GetCustomerAddressesResponse } from "@/types/address";

export type ReportItem = {
  title: string;
  amount: number;
  detail: string;
};

export default function ShippingInformation() {
  const t = useTranslations("myCartPage");
  const g = useTranslations("global");
  const { customer } = useSelector((state: any) => state.customerAuth);
  const { errorMessage, successMessage } = useToast();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null
  );

  const [countryId, setCountryId] = React.useState<string>("");
  const [countryName, setCountryName] = React.useState<string>("");
  const [stateId, setStateId] = React.useState<string>("");
  const [stateName, setStateName] = React.useState<string>("");
  const [cityName, setCityName] = React.useState<string>("");
  const [createAddress] = useMutation(MUTATION_CREATE_CUSTOMER_ADDRESS);
  const [updateAddress] = useMutation(MUTATION_UPDATE_CUSTOMER_ADDRESS);
  const [deleteAddress] = useMutation(MUTATION_DELETE_CUSTOMER_ADDRESS);
  const [setDefaultAddress] = useMutation(MUTATION_SET_DEFAULT_ADDRESS);

  const [formData, setFormData] = React.useState<CustomerAddress>({
    id: "",
    country: {
      country: "",
    },
    state: {
      state: "",
    },
    city: {
      city: "",
    },
    address: "",
    postal_code: "",
    email: "",
    phone_number: "",
    is_used: false,
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

  const handleEdit = (row: CustomerAddress) => {
    setFormData(row);
    setIsUpdate(true);
    handleOpenModal();
  };

  const [getAddresses, { data: addressesData, refetch }] =
    useLazyQuery<GetCustomerAddressesResponse>(QUERY_CUSTOMER_ADDRESS, {
      fetchPolicy: "no-cache",
    });

  const [getCountries, { data: countryData }] =
    useLazyQuery<GetCountryResponse>(QUERY_COUNTRIES, {
      fetchPolicy: "no-cache",
    });

  const [getStates, { data: stateData }] = useLazyQuery<GetStateResponse>(
    QUERY_STATES,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [getCities, { data: cityData }] = useLazyQuery<GetCityResponse>(
    QUERY_CITIES,
    {
      fetchPolicy: "no-cache",
    }
  );

  React.useEffect(() => {
    getAddresses({
      variables: {
        where: { status: "ACTIVE", customer_id: customer.id },
      },
    });
  }, [getAddresses]);

  React.useEffect(() => {
    getCountries();
  }, [getCountries]);

  React.useEffect(() => {
    getStates({
      variables: {
        countryId: countryId,
      },
    });
  }, [countryId]);

  React.useEffect(() => {
    getCities({
      variables: {
        countryId: countryId,
        stateId: stateId,
      },
    });
  }, [countryId, stateId]);

  const countries =
    countryData?.getCountries?.data?.map((country) => ({
      label: country.country,
      value: country.id,
    })) || [];

  const states =
    stateData?.getStates?.data?.map((state) => ({
      label: state.state,
      value: state.id,
    })) || [];

  const cities =
    cityData?.getCities?.data?.map((city) => ({
      label: city.city,
      value: city.city,
    })) || [];

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    if (!countryName && !cityName) {
      errorMessage({
        message: "Please select country or city!",
        duration: 3000,
      });
    }
    try {
      if (isUpdate) {
        const res = await updateAddress({
          variables: {
            data: {
              id: formData.id,
              country: {
                country: countryName,
              },
              state: {
                state: stateName,
              },
              city: {
                city: cityName,
              },
              address: formData.address,
              postal_code: formData.postal_code,
              email: formData.email,
              phone_number: formData.phone_number,
            },
          },
        });

        if (res?.data?.updateCustomerAddress.success) {
          refetch();
          successMessage({
            message: "Update address successfull!",
            duration: 3000,
          });
        }
      } else {
        const res = await createAddress({
          variables: {
            data: {
              country: {
                country: countryName,
              },
              state: {
                state: stateName,
              },
              city: {
                city: cityName,
              },
              address: formData.address,
              postal_code: formData.postal_code,
              email: formData.email,
              phone_number: formData.phone_number,
            },
          },
        });
        if (res?.data?.createCustomerAddress.success) {
          refetch();
          successMessage({
            message: "Create address successfull!",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      errorMessage({
        message: "Unexpect error. Try again later!",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setIsOpenModal(false);
    }
  };

  const handleDeleteAddress = async () => {
    try {
      if (deleteTargetId) {
        const res = await deleteAddress({
          variables: {
            deleteCustomerAddressId: deleteTargetId,
          },
        });

        if (res?.data?.deleteCustomerAddress.success) {
          refetch();
          successMessage({
            message: "Delete address successfull!",
            duration: 3000,
          });
        } else {
          errorMessage({
            message: res?.data?.deleteCustomerAddress.error.details,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected error, Please try again!",
        duration: 3000,
      });
    } finally {
      setDeleteTargetId(null);
      setIsOpen(false);
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    try {
      const res = await setDefaultAddress({
        variables: {
          setCustomerAddressDefaultToUseId: id,
        },
      });
      if (res?.data?.setCustomerAddressDefaultToUse.success) {
        refetch();
        successMessage({
          message: "Process successful!",
          duration: 3000,
        });
      } else {
        errorMessage({
          message: res?.data?.setCustomerAddressDefaultToUse.error.details,
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected error, Please try again!",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <div className="bg-white w-full flex items-start justify-start flex-col gap-4 mt-4 p-4 rounded">
          <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
            {addressesData?.getCustomerAddresses?.data?.map((row) => (
              <div
                key={row.id}
                className={`relative border rounded ${
                  row.is_used && "border-neon_pink bg-red-100"
                } p-4 h-62 flex items-start justify-center flex-col gap-1 text-gray-400 cursor-pointer`}
                onClick={() => handleSetDefaultAddress(row.id)}
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
                        onClick={() => handleSetDefaultAddress(row.id)}
                        className="w-full text-xs flex items-center justify-start text-gray-500 hover:text-second_black cursor-pointer hover:bg-gray-200 py-2 px-4"
                      >
                        Set as default
                      </button>
                      <button
                        onClick={() => {
                          handleEdit(row);
                          setCountryName(row?.country.country);
                          setStateName(row?.state?.state ?? "");
                          setCityName(row?.city.city);
                        }}
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
                  {g("_address")}:&nbsp;
                  <strong className="text-black font-bold">
                    {row.address}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_postal_code")}:&nbsp;
                  <strong className="text-black font-bold">
                    {row.postal_code}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_city")}:&nbsp;
                  <strong className="text-black font-bold">
                    {row.city.city}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_province")}:&nbsp;
                  <strong className="text-black font-bold">
                    {row?.state?.state ?? ""}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_country")}:&nbsp;
                  <strong className="text-black font-bold">
                    {row.country.country}
                  </strong>
                </p>
                <p className="text-xs text-black mt-2">
                  {g("_contact_person")}:
                </p>
                <p className="text-xs text-gray-500">
                  {g("_telephone")}:&nbsp;
                  <strong className="text-black font-bold">
                    {row.phone_number}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  {g("_email")}:&nbsp;
                  <strong className="text-black font-bold">{row.email}</strong>
                </p>
              </div>
            ))}

            {/* Add New Address Button */}
            <button
              onClick={() => {
                setIsUpdate(false);
                handleOpenModal();
              }}
              className="border rounded border-dotted p-4 h-64 flex items-center justify-center flex-col gap-1 text-gray-400 cursor-pointer"
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
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-3/5 md:inset-0 h-auto shadow"
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
                required
                value={countryName}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const selectedOption = countries.find(
                    (country) => String(country.value) === selectedValue
                  );
                  if (selectedOption) {
                    setCountryId(selectedOption.value);
                    setCountryName(selectedOption.label);
                  }
                }}
              />
              <Select
                name="state"
                title={g("_province")}
                option={states}
                value={stateName}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const selectedOption = states.find(
                    (state) => String(state.value) === selectedValue
                  );
                  if (selectedOption) {
                    setStateId(selectedValue);
                    setStateName(selectedOption?.label || "");
                  }
                }}
              />
              <Select
                name="district"
                title={g("_city")}
                option={cities}
                required
                value={cityName}
                onChange={(e) => {
                  setCityName(e.target.value);
                }}
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
            <div className="w-1/2 flex items-center justify-start gap-4">
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
