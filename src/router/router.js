import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Main = lazy(() => import('../pages/Main'));
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Write = lazy(() => import('../pages/Write'));
const Detail = lazy(() => import('../pages/Detail'));
const ChatRoom = lazy(() => import('../pages/ChatRoom'));
const MyPage = lazy(() => import('../pages/MyPage'));
const KakaoCode = lazy(() => import('../components/features/KakaoCode'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/api/auth/kakao/callback" element={<KakaoCode />} />
          <Route path="/write" element={<Write />} />
          <Route path="/detail/:selectKey" element={<Detail />} />
          <Route path="/chatroom/:roomKey" element={<ChatRoom />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
