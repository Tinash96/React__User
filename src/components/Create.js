
import React, { useState } from 'react';
import styled from 'styled-components';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackArrow from './BackArrow';



const CircleImage = styled.label`
  width: 161px;
  height: 161px;
  border-radius: 50%;
  background:white;
  border:2px solid black;
  border-color:#164B60;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top:100px;
  margin-left:450px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }


`;

const PlusSign = styled.span`
  font-size: 24px;
  width:30px;
  height29px;
  border-radius:50%;
  background-color:grey;
  margin-left:100px;
  margin-top:100px;
`;

function Create() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [FullName, setFullName]=useState('');
  const [JobId, setJobId]=useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newUser = {
      fullName: FullName,
      jobId: JobId,
      image: selectedFile ? URL.createObjectURL(selectedFile) : '',
    };


    axios.post('http://localhost:3000/users', newUser)
    .then((response) => {
      navigate('/', { newUser: response.data });
    })
    .catch((error) => {
      console.error('Error adding user:', error);
    });
    

    
    // navigate('/', { newUser });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };




  

  return (
    <div className='create'>
      <BackArrow />
      <CircleImage>
        {selectedFile ? (
          <img src={URL.createObjectURL(selectedFile)} alt="Uploaded"  />
        ) : (
          <PlusSign>+</PlusSign>
        )}
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </CircleImage>

  <form onSubmit={handleSubmit}>
    <input
     type="text"
     value={FullName}
     onChange={(e)=>setFullName(e.target.value)}
     placeholder='Full Names'


    />

<input
     type="text"
     value={JobId}
     onChange={(e)=>setJobId(e.target.value)}
     placeholder='Job Title'


    />
<button className='btn'type="submit">Add member</button>

  </form>


    </div>


  );
}

export default Create;
























