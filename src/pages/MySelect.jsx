import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "app/module/instance";
import Header from "components/common/Header";
import Layout from "components/common/Layout";
import SelectItem from "components/common/SelectItem";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import IconBack from "static/icons/Variety=back, Status=untab, Size=L.svg";
import styled from "styled-components";

const MySelect = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { page, setLastItemRef } = useInfiniteScroll();

  const [list, setList] = useState([]);
  const __getList = useCallback(async () => {
    try {
      if (pathname === "/postvoted") {
        const { data } = await instance.get(`my/select?page=${page}`);
        setList((prev) => [...prev, ...data.result]);
      } else {
        const { data } = await instance.get(`my/vote?page=${page}`);
        setList((prev) => [...prev, ...data.result]);
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [page, pathname]);

  useEffect(() => {
    __getList();
  }, [__getList]);

  return (
    <>
      <S.Header length={list.length}>
        <img src={IconBack} alt="IconBack" onClick={() => navigate(-1)} />
        <h1>{pathname === "/postvoted" ? "내가 등록한 고민 투표" : "내가 투표한 고민 투표"}</h1>
      </S.Header>

      <Layout>
        <S.Container>
          {list?.map((item, idx) => (
            <SelectItem
              key={item.selectKey}
              item={item}
              idx={idx}
              setRef={setLastItemRef}
              length={list.length}
            />
          ))}
        </S.Container>
      </Layout>
    </>
  );
};

const S = {
  Header: styled(Header)`
    border-bottom: ${(props) => (props.length ? null : `1px solid ${props.theme.sub4}`)};
  `,

  Container: styled.section`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    padding: 6.4rem 0 9.6rem 0;
  `,
};

export default MySelect;
