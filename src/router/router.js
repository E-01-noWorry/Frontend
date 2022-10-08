import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loading from '../pages/Loading';
import Start from '../pages/Start';
import OnBoarding from '../pages/OnBoarding';

import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import KakaoRedirect from '../pages/KakaoRedirect';
import GoogleRedirect from '../pages/GoogleRedirect';

import Main from '../pages/Main';
import Answer from '../pages/Answer';

import MyPage from '../pages/mypage/MyPage';
import PostVoted from '../pages/mypage/PostVoted';
import Voted from '../pages/mypage/Voted';
import MadeRoom from '../pages/mypage/MadeRoom';
import OperatingRoom from '../pages/mypage/OperatingRoom';

import Write from '../pages/Write';
import Detail from '../pages/Detail';
import ChatRoom from '../pages/ChatRoom';

// const Loading = lazy(() => import('../pages/Loading'));
// const Start = lazy(() => import('../pages/Start'));
// const OnBoarding = lazy(() => import('../pages/OnBoarding'));

// const SignUp = lazy(() => import('../pages/SignUp'));
// const Login = lazy(() => import('../pages/Login'));
// const KakaoRedirect = lazy(() => import('../pages/KakaoRedirect'));
// const GoogleRedirect = lazy(() => import('../pages/GoogleRedirect'));

// const Main = lazy(() => import('../pages/Main'));
// const Answer = lazy(() => import('../pages/Answer'));

// const MyPage = lazy(() => import('../pages/mypage/MyPage'));
// const PostVoted = lazy(() => import('../pages/mypage/PostVoted'));
// const Voted = lazy(() => import('../pages/mypage/Voted'));
// const MadeRoom = lazy(() => import('../pages/mypage/MadeRoom'));
// const OperatingRoom = lazy(() => import('../pages/mypage/OperatingRoom'));

// const Write = lazy(() => import('../pages/Write'));
// const Detail = lazy(() => import('../pages/Detail'));
// const ChatRoom = lazy(() => import('../pages/ChatRoom'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/welcome" element={<OnBoarding />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api/auth/kakao/callback" element={<KakaoRedirect />} />
          <Route
            path="/api/auth/google/callback"
            element={<GoogleRedirect />}
          />

          <Route path="/main" element={<Main />} />
          <Route path="/answer" element={<Answer />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/postvoted" element={<PostVoted />} />
          <Route path="/voted" element={<Voted />} />
          <Route path="/maderoom" element={<MadeRoom />} />
          <Route path="/operatingroom" element={<OperatingRoom />} />

          <Route path="/write" element={<Write />} />
          <Route path="/detail/:selectKey" element={<Detail />} />
          <Route path="/chatroom/:roomKey" element={<ChatRoom />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
