import { useEffect, useState } from "react";
import instance from "app/module/instance";
import { userStorage } from "shared/utils/localStorage";

const useGetMyInfo = () => {
  const [myInfo, setMyInfo] = useState({});

  const __getMyInfo = async () => {
    try {
      const { data } = await instance.get("/my");
      setMyInfo(data.result);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (!userStorage.getToken()) return;

    __getMyInfo();
  }, []);

  return myInfo;
};

export default useGetMyInfo;
