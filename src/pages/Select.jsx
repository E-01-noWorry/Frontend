import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { __getSelectAll, __getSelectBySelected } from "app/module/selectSlice";
import useInfiniteScroll from "hooks/useInfiniteScroll";

import Header from "components/common/Header";
import Layout from "components/common/Layout";
import Search from "components/common/Search";
import Category from "components/features/select/Category";
import SelectItem from "components/common/SelectItem";
import Nav from "components/common/Nav";

import Logo from "static/images/Logo.svg";
import IconSurvey from "static/icons/Variety=Survey, Status=untab, Size=L.svg";
import styled from "styled-components";

const Select = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { setLastItemRef } = useInfiniteScroll();

  const data = useSelector((state) => state.select.data);
  const page = useSelector((state) => state.select.page);
  const { query, filter, category, proceeding } = useSelector((state) => state.select.selected);

  useEffect(() => {
    if (query) return;

    if (filter === "인기순") {
      dispatch(__getSelectBySelected({ value: filter, page }));
    } else if (category !== "카테고리") {
      dispatch(__getSelectBySelected({ value: category, page }));
    } else if (proceeding === "진행 중인 투표") {
      dispatch(__getSelectBySelected({ value: proceeding, page }));
    } else {
      dispatch(__getSelectAll(page));
    }
  }, [dispatch, page, query, filter, category, proceeding]);

  return (
    <>
      <Header w={"4.5rem"}>
        <img onClick={() => window.location.reload()} src={Logo} alt="Logo" />
        <div />
        <a
          target="_blank"
          rel="noreferrer"
          href="https://docs.google.com/forms/d/e/1FAIpQLSeHPoDci-rlaFfTEteUDaJXwnoVvvLUKDBQ831gb1o1U6fF5A/viewform"
        >
          <img src={IconSurvey} alt="IconSurvey" />
        </a>
      </Header>

      <Search query={query} />

      <Category filter={filter} category={category} proceeding={proceeding} length={data.length} />

      <Layout>
        <S.Container>
          {data?.map((item, idx) => (
            <SelectItem
              key={item.selectKey}
              item={item}
              idx={idx}
              setRef={setLastItemRef}
              length={data.length}
            />
          ))}
        </S.Container>
      </Layout>

      <Nav nowLocation={pathname} />
    </>
  );
};

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    padding: 17rem 0 9.6rem 0;
  `,
};

export default Select;
