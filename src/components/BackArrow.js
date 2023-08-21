import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; 

const BackArrow = () => {
  const navigate = useNavigate();

  const goBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="back-arrow-container" onClick={goBackToHome}>
      <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      <span className="back-arrow-text"></span>
    </div>
  );
};

export default BackArrow;
