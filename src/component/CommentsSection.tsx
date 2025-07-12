// src/components/CommentsSection.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
} from '../interfaces/comments';
import type { Comment } from '../interfaces/comments';
import toast from 'react-hot-toast';
import { useAppSelector } from '../Hooks';
import { fetchUserProfile } from '../interfaces/user';

interface Props {
  productId: string;
}

const CommentsSection: React.FC<Props> = ({ productId }) => {
  const { loginToken, userId } = useAppSelector((s) => s.auth);
  const [usernames, setUsernames] = useState<Record<string, string>>({});
  const [avatars, setAvatars] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const loadComments = async () => {
    try {
      if (!loginToken) return;
      const fetched = await fetchComments(productId, loginToken);
      setComments(fetched);

      const unique = Array.from(new Set(fetched.map(c => c.userId)));
      const newNames: Record<string, string> = {};
      const newAvatars: Record<string, string> = {};
      await Promise.all(unique.map(async id => {
        if (!usernames[id]) {
          try {
            const user = await fetchUserProfile(id, loginToken);
            newNames[id] = user.username;
            newAvatars[id] = user.avatar || '';
          } catch {
            newNames[id] = 'Unknown';
            newAvatars[id] = '';
          }
        }
      }));
      setUsernames(prev => ({ ...prev, ...newNames }));
      setAvatars(prev => ({ ...prev, ...newAvatars }));
    } catch {}
  };

  useEffect(() => {
    loadComments();
  }, [productId]);

  const handleAdd = async () => {
    if (!newComment.trim() || !loginToken) return;
    try {
      const updated = await addComment(productId, newComment, loginToken);
      setComments(updated);
      setNewComment('');
      loadComments();

      // ✅ Scroll to the latest comment
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch {
      toast.error('Failed to add comment');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editingText.trim() || !loginToken) return;
    try {
      const updated = await updateComment(productId, id, editingText, loginToken);
      setComments(updated);
      setEditingId(null);
      setEditingText('');
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id: string) => {
    if (!loginToken) return;
    try {
      const updated = await deleteComment(productId, id, loginToken);
      setComments(updated);
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="bg-gray-100 p-6 md:p-20 rounded-lg shadow-md">
      <div className="text-center mb-10">
        <h2 className="
          relative text-3xl md:text-4xl font-bold text-[#0058AA] inline-block
          after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-1 after:bg-[#FBD913]
          before:content-[''] before:absolute before:-bottom-5 before:left-1/4 before:w-1/2 before:h-1 before:bg-[#0058AA]">
          Reviews
        </h2>
      </div>

      {loginToken && (
        <div className="mb-8">
          <label className="block text-lg font-bold text-gray-800 mb-3">Add Review ✍️</label>
          <div className="flex gap-3 items-center">
            <input
              className="flex-1 border border-gray-300 rounded-full px-6 py-3 text-base shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center gap-2"
              onClick={handleAdd}
            >
              <span className="cursor-pointer">Comment</span> ✈️
            </button>
          </div>
        </div>
      )}

      {comments.length === 0 ? (
        <p className="text-center text-gray-500 italic">No reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {comments.map(c => {
            const isOwner = userId?.toString() === c.userId.toString();
            return (
              <div key={c._id} className="flex gap-4 items-start pb-7 relative group">
                <img
                  src={avatars[c.userId] || 'https://ui-avatars.com/api/?name=Unknown&background=ccc&color=000'}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {usernames[c.userId] || 'Loading...'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {isOwner && (
                      <div className="relative">
                        <button
                          className="hover:text-gray-800 text-xl cursor-pointer"
                          onClick={() => setOpenMenuId(openMenuId === c._id ? null : c._id)}
                        >
                          ⋯
                        </button>
                        {openMenuId === c._id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-20 transition ease-out duration-150">
                            <button
                              onClick={() => {
                                setEditingId(c._id);
                                setEditingText(c.comment);
                                setOpenMenuId(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(c._id);
                                setOpenMenuId(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {editingId === c._id ? (
                    <div className="mt-2 flex flex-col sm:flex-row gap-2">
                      <input
                        className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-blue-400"
                        value={editingText}
                        onChange={e => setEditingText(e.target.value)}
                      />
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                          onClick={() => handleUpdate(c._id)}
                        >
                          Save
                        </button>
                        <button
                          className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                          onClick={() => {
                            setEditingId(null);
                            setEditingText('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-gray-800 bg-white px-6 py-4 rounded-xl shadow-sm">
                      {c.comment}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} /> 
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
