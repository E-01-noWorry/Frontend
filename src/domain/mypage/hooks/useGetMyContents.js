import { useState, useEffect, useCallback } from "react";
import instance from "app/module/instance";

const useGetMyContents = (page, pathname) => {
  const [list, setList] = useState([]);

  const __getList = useCallback(async () => {
    try {
      let data;
      switch (pathname) {
        case "/postvoted":
          data = await instance.get(`my/select?page=${page}`);
          break;
        case "/voted":
          data = await instance.get(`my/vote?page=${page}`);
          break;
        case "/maderoom":
          data = await instance.get(`my/room?page=${page}`);
          break;
        case "/operatingroom":
          data = await instance.get(`my/enter?page=${page}`);
          break;
        default:
          break;
      }
      setList((prev) => [...prev, ...data.data.result]);
    } catch (error) {
      throw new Error(error);
    }
  }, [page, pathname]);

  useEffect(() => {
    __getList();
  }, [__getList]);

  return list;
};

export default useGetMyContents;
