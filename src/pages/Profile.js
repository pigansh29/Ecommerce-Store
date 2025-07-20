import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });
  const [editing, setEditing] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p className="text-gray-600">You are not logged in. Please log in to view your profile.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setEditing(true);
    dispatch(reset());
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({ name: user.name, email: user.email, password: '' });
    dispatch(reset());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }
    const updateData = { name: formData.name, email: formData.email };
    if (formData.password) updateData.password = formData.password;
    dispatch(updateProfile(updateData))
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully');
        setEditing(false);
      })
      .catch((err) => {
        toast.error(err || 'Update failed');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password (leave blank to keep unchanged)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
          {isError && <div className="text-red-600 text-sm">{message}</div>}
        </form>
      ) : (
        <>
          <div className="mb-2">
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div className="mb-2">
            <span className="font-semibold">User ID:</span> {user.id}
          </div>
          <button
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
          {isSuccess && <div className="text-green-600 text-sm mt-2">Profile updated!</div>}
        </>
      )}
    </div>
  );
};

export default Profile; 