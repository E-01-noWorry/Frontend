import React from 'react';
import { useNavigate } from 'react-router-dom';


const Main = () => {

  const navigate = useNavigate();

  return( 
  <div>
    <h1>메인페이지</h1>
    <button onClick={()=>navigate("/login")}>로그인</button>
  </div>
  );
};

export default Main;
