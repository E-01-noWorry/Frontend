import React, { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import instance from "app/module/instance";

import Loading from "common/components/Loading";
import { userStorage } from "shared/utils/localStorage";

const GoogleRedirect = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const googleLogin = useCallback(async () => {
    try {
      const { data } = await instance.get(`/auth/google/callback?code=${code}`);
      userStorage.setStorage(data.user);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  }, [code]);

  useEffect(() => {
    googleLogin();
  }, [googleLogin]);

  return <Loading />;
};

export default GoogleRedirect;
