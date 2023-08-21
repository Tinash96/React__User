
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import BackArrow from './BackArrow';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: '',
    fullName: '',
    email: '',
    jobId: '',
    image: '',
  });

 

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setUser({ ...user, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, user);
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container">
      <BackArrow />
      <div className="form">
        <div className="image-upload">
          <label htmlFor="image-upload-input" className="image-upload-label">
            <div className="avatar">
              {user.image ? (
                <img src={user.image} alt="Avatar" />
              ) : null}
               
              
            </div>
            <span className="plus-sign" onClick={() => document.getElementById('image-upload-input').click()}>+</span>
            <input
              type="file"
              id="image-upload-input"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            /> 
          </label>
        </div>
        <form className="form2" onSubmit={handleUpdate}>
          <div className="input-container">
        <input
          type="text"
          value={user.fullName}
           onChange={(e) => setUser(prevUser => ({ ...prevUser, fullName: e.target.value }))}
          placeholder='Full Names'
          className="form-input"
        />
        <input
          type="text"
          value={user.jobId}
          onChange={(e) => setUser(prevUser => ({ ...prevUser, jobId: e.target.value }))}
          placeholder='JobId'
          className="form-input"
        />
        </div>
        <button className="button" onClick={handleUpdate}>
          Update
        </button>
        </form>
      </div>
    </div>
  );
}

export default Update;

