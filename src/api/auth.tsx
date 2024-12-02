import { ILogins, ILogouts } from "@/types/login";
import { ISignups } from "@/types/signup";
// import { useToast } from "@/utils/toast";
const header = new Headers();
header.append("Content-Type", "application/json");

export const ActionLogin = async (data: ILogins) => {
  // const { errorMessage } = useToast();
  const options: RequestInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data),
    credentials: "include",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/patients/login",
      options
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    if (error.status === 500) {
      // errorMessage({
      //   message: "Email or password incorrect!",
      //   duration: 3000,
      // });
      alert("Email or password incorrect!");
    } else {
      return { error: error.message };
    }
  }
};

export const ActionLogout = async (data: ILogouts) => {
  const options: RequestInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data),
    credentials: "include",
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/patients/logout",
      options
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
  }
};

export const ActionSignUp = async (data: ISignups) => {
  const options: RequestInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data),
    credentials: "include",
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/patients/signup",
      options
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
  }
};
