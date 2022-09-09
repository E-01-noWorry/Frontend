import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Welcome = lazy(() => import('../pages/Welcome'));
const Main = lazy(() => import('../pages/Main'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Login = lazy(() => import('../pages/Login'));
const KakaoCode = lazy(() => import('../components/features/KakaoCode'));
const GoogleRedirect = lazy(() => import('../pages/GoogleRedirect'));
const MyPage = lazy(() => import('../pages/MyPage'));
const PostVoted = lazy(() => import('../components/features/mypage/postVoted'));
const Write = lazy(() => import('../pages/Write'));
const Detail = lazy(() => import('../pages/Detail'));
const ChatRoom = lazy(() => import('../pages/ChatRoom'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main" element={<Main />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api/auth/kakao/callback" element={<KakaoCode />} />
          <Route
            path="/api/auth/google/callback"
            element={<GoogleRedirect />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/postvoted" element={<PostVoted />} />

          <Route path="/write" element={<Write />} />
          <Route path="/detail/:selectKey" element={<Detail />} />
          <Route path="/chatroom/:roomKey" element={<ChatRoom />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
