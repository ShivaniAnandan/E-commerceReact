import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/UserSlice'; // Make sure to implement this action in UserSlice
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const user = useSelector(state => state.user.user);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      email,
      password,
      profileImage
    };
    dispatch(updateUser(updatedUser)); // Dispatch an action to update the user
    navigate('/'); // Redirect after saving
  };

  return (
    <div className="profile-container container mt-5">
      <h1>Edit Profile</h1>
      <div className="profile-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">Profile Image URL</label>
          <input
            type="text"
            className="form-control"
            id="profileImage"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <img
            src={profileImage}
            alt="Profile"
            className="img-thumbnail"
            style={{ maxWidth: '150px', maxHeight: '150px' }}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
