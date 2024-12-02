import { queryData, updateAPI } from "@/api/api";
import { IProfile } from "@/types/profile";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@/components/select";
import Textfield from "@/components/textField";
import { UploadIcon, WarningIcon } from "@/icons/page";
import { login, logout } from "@/redux/slice/authSlice";
import { ActionLogout } from "@/api/auth";
import { ITokens } from "@/types/login";
import IconButton from "@/components/iconButton";
import DatePicker from "@/components/datePicker";
import Image from "next/image";
import DeleteModal from "@/components/deleteModal";
import { gender } from "@/utils/option";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { warningMessage, errorMessage, successMessage } = useToast();
  const [IsCreate, setIsCreate] = React.useState(false);
  const [profileData, setProfileData] = React.useState<IProfile>({
    firstName: "",
    lastName: "",
    address: "",
    gender: "",
    dob: "",
  });
  const checkboxRef = useRef<HTMLInputElement>(null);
  const handleCreate = () => {
    setIsCreate(!IsCreate);
  };
  const handleButtonClick = () => {
    if (checkboxRef.current && !checkboxRef.current.checked) {
      warningMessage({
        message: "Please confirm account deactivation",
        duration: 3000,
      });
    } else {
      handleCreate();
    }
  };

  const queryUserData = async () => {
    try {
      const res = await queryData({ url: "/patients/me" });
      if (res?.status === 200) {
        const data = res.data;
        dispatch(
          login({
            address: data?.address,
            balance: data?.balance,
            email: data?.email,
            firstName: data?.firstName,
            gender: data?.gender,
            id: data?.id,
            lastName: data?.lastName,
            password: data?.password,
            phone: data?.phone,
            profile: data?.profile,
            status: data?.status,
            createdAt: data?.createdAt,
            createdBy: data?.createdBy,
            updatedAt: data?.updatedAt,
            dob: data?.dob,
          })
        );
      } else {
        errorMessage({ message: "Something went wrong", duration: 3000 });
      }
    } catch (error) {
      errorMessage({ message: "Something went wrong", duration: 3000 });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a shallow copy of profileData and remove the email and phone fields
    const updatedProfileData = { ...profileData };
    delete updatedProfileData.email;
    delete updatedProfileData.phone;
    try {
      const res = await updateAPI({
        url: "/patients/" + user?.id + "/account",
        body: updatedProfileData,
      });

      if (res?.errors) {
        errorMessage({ message: res?.errors[0]?.msg, duration: 3000 });
      }

      if (res?.status === 400) {
        errorMessage({ message: res?.message, duration: 3000 });
      }

      if (res?.status === 200) {
        queryUserData();
        successMessage({ message: res?.message, duration: 3000 });
      }
    } catch (error) {
      errorMessage({ message: "Something went wrong", duration: 3000 });
    }
  };

  const handleInactiveAccount = async () => {
    handleCreate();
    try {
      const res = await updateAPI({
        url: "/patients/delete-account",
        body: {},
      });
      if (res?.errors) {
        errorMessage({ message: res?.errors[0].msg, duration: 1000 });
      }
      if (res?.status == 200) {
        handleLogout();
        successMessage({ message: res?.message, duration: 1000 });
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    }
  };

  const handleLogout = async () => {
    try {
      if (!user?.email) {
        throw new Error("User email not available.");
      }
      const res: ITokens = await ActionLogout({ email: user.email });
      if (res?.status === 200) {
        dispatch(logout());
        router.push("/signin");
      } else {
        errorMessage({
          message: "Failed to log out. Please try again.",
          duration: 3000,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    }
  };

  React.useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
        gender: user.gender || "",
        dob: user.dob || "",
      });
    }
  }, [user]);

  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null); // For previewing the image
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInBytes = 800 * 1024; // 800KB in bytes

    if (selectedFile) {
      // Check file type
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMessages("Only JPG, JPEG, and PNG files are allowed.");
        setFile(null);
        setPreview(null);
        return;
      }

      // Check file size
      if (selectedFile.size > maxSizeInBytes) {
        setErrorMessages("File size exceeds 800KB.");
        setFile(null);
        setPreview(null);
        return;
      }

      // If valid, set the file and generate a preview
      setErrorMessages(null);
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setErrorMessages("Please select a valid file.");
      return;
    }
    var formData = new FormData();
    formData.append("images", file, "");

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/patients/upload-profile",
        {
          method: "PUT",
          body: formData,
          redirect: "follow",
        }
      );
      if (res?.status == 201) {
        alert("File uploaded successfully!");
        setPreview(null); // Clear preview after successful upload
        setFile(null);
      } else {
        setErrorMessages("File upload failed.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessages("An error occurred during file upload.");
    }
  };

  return (
    <div className="flex items-start justify-center flex-col gap-6">
      <div className="flex items-start justify-center flex-col gap-4">
        <h3 className="font-bold text-b_text">Profile Details</h3>
        <form
          onSubmit={handleSubmit}
          className="flex items-start justify-start gap-4 text-b_text"
        >
          <div>
            {preview ? (
              <Image
                src={preview}
                width={80}
                height={80}
                alt="Image preview"
                className="max-w-full h-auto border rounded"
              />
            ) : (
              <Image
                src="/images/default-image.webp"
                width={80}
                height={80}
                alt="Image preview"
                className="max-w-full h-auto border rounded"
              />
            )}
          </div>
          <div className="flex items-start justify-start flex-col gap-3">
            <label className="block text-b_text text-xs">
              Upload file ( JPG, JPEG, PNG only, max size: 800KB ):
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              id="file-upload"
              onChange={handleFileChange}
              className="block w-full hidden"
            />
            {errorMessages && (
              <p className="text-red-500 text-xs">{errorMessages}</p>
            )}
            <div className="flex items-start justify-start gap-4">
              <label
                htmlFor="file-upload"
                className="text-xs border p-2 rounded flex items-center justify-center cursor-pointer"
              >
                Select new
              </label>
              <IconButton
                className="rounded bg-primary text-white p-2 bg-base text-xs"
                icon={<UploadIcon size={18} className="mr-1" />}
                title="Update"
                isFront={true}
              />
            </div>
          </div>
        </form>
      </div>
      <form
        action=""
        className="border w-full px-4 py-6 rounded bg-white"
        onSubmit={handleUpdateProfile}
      >
        <div className="w-full grid grid-cols-2 gap-2 lg:grid-cols-2">
          <Textfield
            name="firstName"
            id="firstName"
            title="First name"
            required
            color="text-b_text"
            value={profileData.firstName}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                firstName: e.target.value,
              })
            }
          />
          <Textfield
            name="lastName"
            id="lastName"
            title="Last name"
            required
            color="text-b_text"
            value={profileData.lastName}
            onChange={(e) =>
              setProfileData({ ...profileData, lastName: e.target.value })
            }
          />
          <Textfield
            name="phoneNumber"
            id="phoneNumber"
            title="Phone"
            required
            color="text-b_text"
            value={profileData.phone}
            readOnly={true}
          />
          <Textfield
            name="email"
            id="email"
            title="Email"
            required
            color="text-b_text"
            value={profileData.email}
            readOnly={true}
          />
          <Textfield
            name="address"
            id="address"
            title="Address"
            required
            color="text-b_text"
            value={profileData.address}
            onChange={(e) =>
              setProfileData({ ...profileData, address: e.target.value })
            }
          />
          <Select
            name="gender"
            title="Gender"
            option={gender}
            value={profileData.gender}
            onChange={(e) =>
              setProfileData({ ...profileData, gender: e.target.value })
            }
            required
            className="h-7.5"
          />
          <DatePicker
            name="birthday"
            title="Date Of Birth"
            value={profileData.dob || ""}
            onChange={(e) =>
              setProfileData({ ...profileData, dob: e.target.value })
            }
            required
            className="h-7.5"
          />
        </div>
        <div className="flex items-center justify-start gap-4 mt-4">
          <IconButton
            className="rounded bg-primary text-white p-2 bg-base text-xs"
            title="Save Change"
            isFront={true}
            type="submit"
          />
          <IconButton
            className="rounded text-base p-2 border bg-white text-xs"
            title="Cancel"
            isFront={true}
          />
        </div>
      </form>
      <div className="border w-full px-4 py-6 rounded bg-white flex items-start justify-start flex-col gap-2">
        <h3 className="font-bold text-b_text">Delete account</h3>
        <div
          className="w-full p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 flex items-start justify-start gap-4"
          role="alert"
        >
          <WarningIcon size={22} />
          <p className="text-xs">
            <span className="font-medium">
              Are you sure you want to delete your account?
            </span>
            <br />
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>
        <div className="flex items-center">
          <input
            id="default-checkbox"
            type="checkbox"
            ref={checkboxRef}
            className="w-4 h-4 text-base bg-gray-100 border-gray-300 rounded focus:ring-base"
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            I confirm my account deactivation
          </label>
        </div>
        <IconButton
          className="rounded text-white p-2 bg-error mt-4 text-xs"
          title="Deactive Account"
          // onClick={handleCreate}
          onClick={handleButtonClick}
        />
      </div>

      <div className="bg-black">
        <DeleteModal
          isOpen={IsCreate}
          onClose={handleCreate}
          onConfirm={handleInactiveAccount}
        />
      </div>
    </div>
  );
}
