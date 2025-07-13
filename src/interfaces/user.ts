import axios from 'axios';

export interface UserProfile {
  _id: string;
  username: string;
  avatar?: string;
}

export const fetchUserProfile = async (
  userId: string,
  token: string
): Promise<UserProfile> => {
  const { data } = await axios.get(
    `https://nodejs-e-commerce-production-f414.up.railway.app/api/user/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }

  throw new Error('User not found');
};

