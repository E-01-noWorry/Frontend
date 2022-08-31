import React from 'react';
import { useLocation } from 'react-router-dom';
import WriteSelect from '../components/features/write/WriteSelect';

const Write = () => {
  const { state } = useLocation();

  return <div>{state === 'select' ? <WriteSelect /> : null}</div>;
};

export default Write;
