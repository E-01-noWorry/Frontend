import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/', { state: 'select' })}>
        선택페이지
      </button>
      <button onClick={() => navigate('/', { state: 'worry' })}>
        고민상담방
      </button>
      <button onClick={() => navigate('/mypage')}>마이페이지</button>
    </div>
  );
};

export default Footer;
