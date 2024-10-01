import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/UserSlice'; // Make sure to implement this action in UserSlice
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'; // Icon for the edit button


const ProfilePage = () => {
  const user = useSelector(state => state.user.user);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [editImage, setEditImage] = useState(false); // Control edit state for image
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      email,
      profileImage
    };
    dispatch(updateUser(updatedUser)); // Dispatch an action to update the user
    navigate('/'); // Redirect after saving
  };

  // Handle image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result); // Set the uploaded image as base64
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container container mt-5">
      <div className="text-center mb-4">
        <div className="position-relative d-inline-block">
          <img
            src={profileImage || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="rounded-circle img-thumbnail profile-image"
            style={{ maxWidth: '150px', maxHeight: '150px' }}
          />
          <button
            type="button"
            className="btn btn-link p-0 position-absolute edit-icon"
            onClick={() => setEditImage(true)}
          >
            <FaEdit size={20} />
          </button>
        </div>
      </div>

      <div className="profile-form mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Edit Profile</h2>
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

        {/* Show file input when user clicks edit icon */}
        {editImage && (
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        )}

        <div className="text-center">
          <button
            className="btn btn-primary mt-3"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
