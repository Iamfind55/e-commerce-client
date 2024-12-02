export const gender: any = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Others", value: "others" },
];

export const transactions: any = [
  { label: "Deposit", value: "deposit" },
  { label: "Withdraw", value: "withdraw" },
];

export const times: any = [
  { label: "5 Minutes", value: 5 },
  { label: "10 Minutes", value: 10 },
  { label: "15 Minutes", value: 15 },
  { label: "20 Minutes", value: 20 },
  { label: "25 Minutes", value: 25 },
  { label: "30 Minute", value: 30 },
  { label: "40 Minute", value: 40 },
  { label: "50 Minute", value: 50 },
  { label: "1 Hour", value: 60 },
];

export enum useStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
  LOCKED = "locked",
  BLOCKED = "blocked",
}

export const booking_status: any = [
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Canceled", value: "canceled" },
  { label: "Reschedule", value: "reschedule" },
];

export const prices: any = [
  { label: "100,000 Kip", value: "100000" },
  { label: "200,000 Kip", value: "200000" },
  { label: "500,000 Kip", value: "500000" },
  { label: "1,000,000 Kip", value: "1000000" },
  { label: "2,000,000 Kip", value: "2000000" },
  { label: "5,000,000 Kip", value: "5000000" },
  { label: "10,000,000 Kip", value: "10000000" },
];

export const appointment_available_options: any = [
  { label: "All", value: "all" },
  { label: "Free doctor only", value: "free_doctor_only" },
  { label: "Available doctor only", value: "available_doctor_only" },
];

export const bankAccountColumns = [
  "ID",
  "Name",
  "Account name",
  "Account number",
  "Status",
  "Created",
  "Actions",
];

export const bookingHistoryColumns = [
  "ID",
  "Doctor",
  "Date",
  "Time",
  "Total time",
  "Total cost",
  "Status",
];

export const transactionColumns = [
  "ID",
  "Transaction",
  "Amount",
  "Status",
  "Created",
  "Actions",
];

export const doctorColumns = [
  "ID",
  "Profile",
  "Full name",
  "Gender",
  "Experiences",
  "Address",
  "Actions",
];

export const countries: any = [
  { label: "Laos", value: "laos" },
  { label: "Thailand", value: "thailand" },
  { label: "Vietname", value: "vietname" },
  { label: "Korean", value: "korean" },
  { label: "China", value: "china" },
];

// export const page_limits: any = [
//   { label: "10", value: "10" },
//   { label: "30", value: "30" },
//   { label: "50", value: "50" },
//   { label: "100", value: "100" },
// ];

export const page_limits: any = [
  { label: "10", value: 10 },
  { label: "30", value: 30 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];
