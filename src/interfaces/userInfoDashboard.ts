export interface IUserInfo {
  _id: string;
  userID: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin' | 'manager'; 
  verified: string;
  verificationCode: string;
  verificationCodeValidation: number;
  forgetPasswordCode: string;
  forgetPasswordCodeValidation: number;
  avatar: string;
  wishlist: string[];
  createdAt: string;  
  updatedAt: string;  
}
