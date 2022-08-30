import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import SignUp from '../pages/SignUp';
import KakaoCode from '../components/features/KakaoCode';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/api" element={<KakaoCode/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
