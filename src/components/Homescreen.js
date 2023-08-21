// import React from 'react';
// import '../App.css';
// // import List from './List';
// import {  useNavigate } from 'react-router-dom';


// function Homescreen (){


//     const navigate = useNavigate()
    

//     return (
//         <div className="container">
//           <button className="button"onClick={() => navigate("/create")} >Add Member</button>
        
          
        
//         </div>



//       );


    
      
      
      



// }

// export default Homescreen;


// HomeScreen.js

// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'



function HomeScreen() {
  const [users, setUsers] = useState([]);
  const [noUsers, setNoUsers] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.state && location.state.newUser) {
      setUsers((prevUsers) => [...prevUsers, location.state]);
    }
  }, [location.state]);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/users');
    setUsers(response.data);
  };

  
  

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      fetchData(); 
      
      if (users.length === 1) {
        console.log("Setting noMembers to true");
        setNoUsers(true);
      }

    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <div className="home">
      <button className="btns" onClick={() => navigate("/create")}>Add Member</button>
      {noUsers ? (
        <p className="no-members-message">No members in the database</p>
      ) : (
      <ul className="user-list">
      { users.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-profile">
              <img
                src={user.image}
                alt={`${user.fullName}'s Profile`}
                className="profile-image"
              />
            </div>
            <div className="user-details">
             {user.fullName && <p  className="user-name">{user.fullName}</p>}
              {user.jobId &&<p className="user-job-id"> {user.jobId}</p>}
            </div>
            <div className="user-actions">
              <Link to={`/update/${user.id}`} className="edit-link">
                <FontAwesomeIcon icon={faEdit} className="action-icon" />
              </Link>
              <button className="delete-link" onClick={() => handleDelete(user.id)}>
                <FontAwesomeIcon icon={faTrashAlt} className="action-icon" />
              </button>
            </div>
               
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default HomeScreen;

