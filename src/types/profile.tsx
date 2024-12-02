export interface IBank {
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  name: string;
  accountName: string;
  accountNumber: string;
  qrCode: string;
  deposits: any[]; // You can update this type if needed, depending on the structure of deposits
}

export interface IProfile {
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  gender?: string;
  status?: string;
  dob?: string;
  createdAt?: string;
  updatedAt?: string;
  profile?: string;
  balance?: string;
  banks?: IBank[];
}

export interface IPassword {
  currentPassword?: string;
  newPassword?: string;
}

export interface IPasswordWithConfirm extends IPassword {
  confirmPassword?: string;
}

export interface IEmail {
  currentEmail: string;
  newEmail: string;
}

export interface IPhoneNumber {
  currentPhone: string;
  newPhone: string;
}

export interface IPasswordValidationResult {
  isValid: boolean;
  hasUppercase: boolean;
  hasNumberSymbolOrWhitespace: boolean;
  isLongEnough: boolean;
}
