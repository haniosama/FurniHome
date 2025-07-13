export interface IRegister {
  username: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  avatar?: File | null;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface IChangePassword {
  email: string;
  providedCode: string;
  newPassword: string;
}