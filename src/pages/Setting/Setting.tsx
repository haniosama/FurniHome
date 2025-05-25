import React, { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface UserInfo {
  username: string;
  email: string;
  phone: string;
  avatar: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  avatarFile?: File;
}

interface OriginalData {
  username: string;
  phone: string;
  avatar: string;
}

interface DecodedToken {
  userID: string;
  userName: string;
  email: string;
  avatar: string;
  role: string;
}

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpvbyIsInVzZXJJRCI6IjY4MzBkZjhlODUxYzJjOTQzZTQ3ZmMxNSIsImVtYWlsIjoiam9vQGdtYWlsLmNvbSIsInZlcmlmaWVkIjpmYWxzZSwiYXZhdGFyIjoidXNlci0xNzQ3OTQxMTE2NzgzNzIuMTk4ODUzOTM3ODg1OTQucG5nIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDgwMzM0NjF9.IXFYhPSP-KhGGwI7dZost_TeDvO5hPkaY3fJ54q5Kdk';

const Setting: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '',
    email: '',
    phone: '',
    avatar: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [originalData, setOriginalData] = useState<OriginalData>({
    username: '',
    phone: '',
    avatar: ''
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const decoded: DecodedToken = jwtDecode(token.split(' ')[1]);
  const userId = decoded.userID;

  useEffect(() => {
    axios.get(`https://ecommerceapi-production-8d5f.up.railway.app/api/user/${userId}`, {
      headers: { Authorization: token }
    }).then(res => {
      const data = res.data.data[0];
      setUserInfo(prev => ({
        ...prev,
        username: data.username,
        email: data.email,
        phone: data.phone,
        avatar: data.avatar
      }));
      setOriginalData({
        username: data.username,
        phone: data.phone,
        avatar: data.avatar
      });
    }).catch(console.error);
  }, [userId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUserInfo(prev => ({ ...prev, avatarFile: file }));
    }
  };

  const hasChanges = () => {
    return (
      userInfo.username !== originalData.username ||
      userInfo.phone !== originalData.phone ||
      !!userInfo.avatarFile ||
      !!userInfo.oldPassword ||
      !!userInfo.newPassword
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (userInfo.newPassword && userInfo.newPassword !== userInfo.confirmNewPassword) {
      toast.error('New password and confirmation do not match');
      return;
    }
    const formData = new FormData();
    if (userInfo.avatarFile) {
      formData.append('avatar', userInfo.avatarFile);
    } else {
      formData.append('oldAvatar', userInfo.avatar || 'profile.png');
    }
    formData.append('username', userInfo.username);
    formData.append('phone', userInfo.phone);
    formData.append('oldPassword', userInfo.oldPassword);
    formData.append('newPassword', userInfo.newPassword);

    try {
      setLoading(true);
      await axios.patch(
        'https://ecommerceapi-production-8d5f.up.railway.app/api/auth/changeUserInfo',
        formData,
        { headers: { Authorization: token } }
      );
      
      toast.success('Updated Successfully');
    } catch (err) {
      toast.error('Failed to update data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.4 }}
  className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-5"
>
  <ToastContainer />

    <div className="text-center">
      <h2
        className="relative text-3xl md:text-4xl font-bold mb-12 text-[#0058AA]
                  inline-block
                  after:content-[''] after:absolute after:-bottom-3 after:left-0 
                  after:w-full after:h-1 after:bg-[#FBD913] after:opacity-80
                  before:content-[''] before:absolute before:-bottom-5 before:left-1/4 
                  before:w-1/2 before:h-1 before:bg-[#0058AA] before:opacity-50"
      >
        Personal Settings
      </h2>
    </div>



  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
    <div className="flex flex-col md:flex-row items-start gap-8">
      {/* Image */}
      <div className="w-full md:w-1/6 flex justify-center md:justify-start">
        <motion.div 
          className="relative w-40 h-40"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0058AA] shadow-lg">
          <img
            src={
              previewImage
                ? previewImage
                : '/Ronaldo.jpg'
            }
            alt="Avatar"
            className="w-full h-full object-cover"
          />

          </div>
          <label
            htmlFor="avatar"
            className="absolute bottom-0 right-3 z-10 cursor-pointer bg-[#0058AA] text-white p-2 rounded-full shadow-lg hover:bg-[#004080] translate-x-1 translate-y-1"
          >
            <FaCamera className="w-4 h-4" />
          </label>
        </motion.div>
        <input
          type="file"
          id="avatar"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* inputs */}
      <div className="w-full grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-gray-700 flex items-center font-medium text-left">
            <FaUser className="mr-2 text-[#0058AA]" />
            Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:border-[#0058AA] focus:ring-1 focus:ring-[#0058AA] transition duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-700 flex items-center font-medium text-left">
            <FaEnvelope className="mr-2 text-[#0058AA]" />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            disabled
            readOnly
            onChange={handleInputChange}
            className="border border-gray-300 bg-blue-50 p-3 rounded w-full focus:outline-none focus:border-[#0058AA] focus:ring-1 focus:ring-[#0058AA] transition duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-gray-700 flex items-center font-medium text-left">
            <FaPhone className="mr-2 text-[#0058AA]" />
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:border-[#0058AA] focus:ring-1 focus:ring-[#0058AA] transition duration-200"
          />
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="border border-[#0058AA] my-6 opacity-100"></div>

    {/* Change password */}
    <div>
      <h3 className="text-xl font-bold mb-5 text-[#0058AA]">Change Password</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="oldPassword" className="text-gray-700 flex items-center font-medium text-left">
            <FaLock className="mr-2 text-[#0058AA]" />
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:border-[#0058AA] focus:ring-1 focus:ring-[#0058AA] transition duration-200"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="newPassword" className="text-gray-700 flex items-center font-medium text-left">
            <FaLock className="mr-2 text-[#0058AA]" />
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:border-[#0058AA] focus:ring-1 focus:ring-[#0058AA] transition duration-200"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="confirmNewPassword" className="text-gray-700 flex items-center font-medium text-left">
            <FaLock className="mr-2 text-[#0058AA]" />
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:border-[#0058AA] focus:ring-1 focus:ring-[#0058AA] transition duration-200"
          />
        </div>
      </div>
    </div>

    {/* Save Changes */}
    <div className="text-center">
      <motion.button
        type="submit"
        disabled={!hasChanges() || loading}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className={`mt-4 py-3 px-8 rounded-lg text-lg font-semibold transition duration-300 shadow-md cursor-pointer ${
          !hasChanges() || loading
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-[#0058AA] text-white hover:bg-[#004080]'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </span>
        ) : 'Save Changes'}
      </motion.button>
    </div>
  </form>
</motion.div>
  );
};

export default Setting;