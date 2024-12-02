import { DateTime } from "next-auth/providers/kakao";

export interface ILogins {
  email: string;
  password: string;
}

export interface ILogouts {
  email: string;
}

export interface ITokens {
  status: number;
  message: string;
  error: string;
}

export interface IuserData {
  address: string;
  balance: number;
  // banks: Array;
  createdAt?: DateTime;
  createdBy: string;
  dob?: Date;
  email?: string;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  password: string;
  phone?: string;
  profile: string;
  status: string;
  updatedAt?: DateTime;
}
