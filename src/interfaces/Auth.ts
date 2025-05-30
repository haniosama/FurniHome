export interface IRegister {
  username: String;
  email: String;
  phone: String;
  password: String;
  role: String;
  avatar?: File | null;  
}
export interface ILogin {
  email: String;
  password: String;
}
export interface IChangePassword {
  email: String;
  providedCode: String;
  newPassword: String;
}
