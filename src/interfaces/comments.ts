// src/api/comments.ts
import axios from 'axios';

const BASE = 'https://nodejs-e-commerce-production-f414.up.railway.app/api/product/comment';

export interface Comment {
  _id: string;
  userId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchComments = async (productId: string, token: string) => {
  const { data } = await axios.get(`${BASE}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.data.Comments as Comment[];
};

export const addComment = async (
  productId: string,
  commentText: string,
  token: string
) => {
  const { data } = await axios.post(
    `${BASE}/${productId}`,
    { comment: commentText },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.data.Comments as Comment[];
};

export const updateComment = async (
  productId: string,
  commentId: string,
  commentText: string,
  token: string
) => {
  const { data } = await axios.patch(
    `${BASE}/${productId}/${commentId}`,
    { comment: commentText },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.data as Comment[];
};

export const deleteComment = async (
  productId: string,
  commentId: string,
  token: string
) => {
  const { data } = await axios.delete(
    `${BASE}/${productId}/${commentId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.data as Comment[];
};


