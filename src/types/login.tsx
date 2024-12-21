export interface ILogins {
  username: string;
  password: string;
}

export interface ILogouts {
  email: string;
}

export interface IPassword {
  currentPassword?: string;
  newPassword?: string;
}

export interface IPasswordWithConfirm extends IPassword {
  confirmPassword?: string;
}
