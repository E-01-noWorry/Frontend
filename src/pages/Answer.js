import React from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../components/common/Footer';

const Answer = () => {
  const { state } = useLocation();

  return (
    <div>
      <div>곰곰해답</div>
      <Footer state={state} />
    </div>
  );
};

export default Answer;
