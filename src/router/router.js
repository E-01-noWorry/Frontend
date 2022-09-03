import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Write from '../pages/Write';
import Detail from '../pages/Detail';
import ChatRoom from '../pages/ChatRoom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write" element={<Write />} />
        <Route path="/detail/:selectKey" element={<Detail />} />
        <Route path="/chatroom/:roomKey" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
