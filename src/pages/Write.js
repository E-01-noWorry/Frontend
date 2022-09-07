import React from 'react';
import { useLocation } from 'react-router-dom';
import BodyPadding from '../components/common/BodyPadding';
import WriteRoom from '../components/features/write/WriteRoom';
import WriteSelect from '../components/features/write/WriteSelect';

const Write = () => {
  const { state } = useLocation();

  return (
    <BodyPadding>
      {state === 'select' ? <WriteSelect /> : <WriteRoom />}
    </BodyPadding>
  );
};

export default Write;
