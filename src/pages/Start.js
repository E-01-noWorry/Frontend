import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyPadding from '../components/common/BodyPadding';

import { isLogin } from '../shared/isLogin';

import Logo from '../static/images/Logo.svg';

import styled from 'styled-components';

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (isLogin()) {
        navigate('/main', { state: 'select' });
      } else navigate('/welcome');
    }, 1500);
  }, [navigate]);

  return (
    <BodyPadding>
      <StLogo>
        <img src={Logo} alt="Logo" />
      </StLogo>
    </BodyPadding>
  );
};

export default Start;

const StLogo = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;
