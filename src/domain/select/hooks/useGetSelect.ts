import { useEffect } from "react";
import { __getSelectAll, __getSelectBySearch, __getSelectBySelected } from "app/module/selectSlice";
import { clearData } from "app/module/selectSlice";
import { useAppDispatch, useAppSelector } from "app/config/hooks";

const useGetSelect = (page: number) => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.select.data);
  const selected = useAppSelector((state) => state.select.selected);
  const error = useAppSelector((state) => state.select.error);

  useEffect(() => {
    if (selected.query) {
      dispatch(__getSelectBySearch(selected.query));
      return;
    }

    if (selected.filter === "인기순") {
      dispatch(__getSelectBySelected({ value: selected.filter, page }));
    } else if (selected.category !== "카테고리") {
      dispatch(__getSelectBySelected({ value: selected.category, page }));
    } else if (selected.proceeding === "진행중인 투표") {
      dispatch(__getSelectBySelected({ value: selected.proceeding, page }));
    } else {
      dispatch(__getSelectAll(page));
    }
  }, [dispatch, page, selected.query, selected.filter, selected.category, selected.proceeding]);

  useEffect(() => {
    return () => {
      dispatch(clearData());
    };
  }, [dispatch]);

  return { data, selected, error };
};

export default useGetSelect;
