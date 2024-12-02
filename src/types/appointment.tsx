import { IDoctorPublicTypes, IDoctorSchedulesTypes } from "./doctor";
import { IProfile } from "./profile";

export interface IAppointmentTypes {
  doctorId: string;
  scheduleId: string;
  date: string;
  startTime: string;
  endTime: string;
  urgency?: string;
  case?: string;
  notes?: string;
  images?: string;
}
export type IConsultationTypes = {
  id: string;
  url: string;
}[];

export interface IPublicAppointmentTypes {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  total: string;
  status: string;
  case?: string;
  notes?: string;
  filename?: string;
  urgency?: string;
  schedule: IDoctorSchedulesTypes;
  consultations: IConsultationTypes;
  patient: IProfile;
  doctor: IDoctorPublicTypes;
}
