import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDataRoom, __getRoomAll, __getRoomBySearch } from "app/module/roomSlice";

const useGetRoom = (page) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.room.data);
  const query = useSelector((state) => state.room.query);
  const error = useSelector((state) => state.room.error);

  useEffect(() => {
    if (query) {
      dispatch(__getRoomBySearch(query));
      return;
    }

    dispatch(__getRoomAll(page));
  }, [dispatch, query, page]);

  useEffect(() => {
    return () => dispatch(clearDataRoom());
  }, [dispatch]);

  return { data, query, error };
};

export default useGetRoom;
