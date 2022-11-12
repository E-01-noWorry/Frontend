import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Loading = lazy(() => import("pages/Loading"));
const Start = lazy(() => import("pages/Start"));
const OnBoarding = lazy(() => import("pages/OnBoarding"));

const SignUp = lazy(() => import("pages/SignUp"));
const Login = lazy(() => import("pages/Login"));
const KakaoRedirect = lazy(() => import("pages/KakaoRedirect"));
const GoogleRedirect = lazy(() => import("pages/GoogleRedirect"));

const Select = lazy(() => import("pages/Select"));
const Room = lazy(() => import("pages/Room"));
const Answer = lazy(() => import("pages/Answer"));
const MyPage = lazy(() => import("pages/MyPage"));

const MyContents = lazy(() => import("pages/MyContents"));

const Write = lazy(() => import("pages/Write"));
const Detail = lazy(() => import("pages/Detail"));
const ChatRoom = lazy(() => import("pages/ChatRoom"));

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
          <Route path="/api/auth/google/callback" element={<GoogleRedirect />} />

          <Route path="/select" element={<Select />} />
          <Route path="/room" element={<Room />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/mypage" element={<MyPage />} />

          <Route path="/postvoted" element={<MyContents />} />
          <Route path="/voted" element={<MyContents />} />
          <Route path="/maderoom" element={<MyContents />} />
          <Route path="/operatingroom" element={<MyContents />} />

          <Route path="/write" element={<Write />} />
          <Route path="/detail/:selectKey" element={<Detail />} />
          <Route path="/chatroom/:roomKey" element={<ChatRoom />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
