import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Loading = lazy(() => import("common/components/Loading"));
const Start = lazy(() => import("domain/onboarding/Start"));
const OnBoarding = lazy(() => import("domain/onboarding/OnBoarding"));

const SignUp = lazy(() => import("domain/sign/SignUp"));
const Login = lazy(() => import("domain/sign/Login"));
const KakaoRedirect = lazy(() => import("domain/sign/KakaoRedirect"));
const GoogleRedirect = lazy(() => import("domain/sign/GoogleRedirect"));

const Select = lazy(() => import("domain/select/Select"));
const Room = lazy(() => import("domain/room/Room"));
const Answer = lazy(() => import("domain/answer/Answer"));
const MyPage = lazy(() => import("domain/mypage/MyPage"));

const MyContents = lazy(() => import("domain/mypage/MyContents"));

const Write = lazy(() => import("domain/write/Write"));
const Detail = lazy(() => import("domain/select/Detail"));
const ChatRoom = lazy(() => import("domain/room/ChatRoom"));

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
