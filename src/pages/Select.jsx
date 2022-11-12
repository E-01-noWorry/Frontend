import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { __getSelectBySearch, clearError, clearQuery } from "app/module/selectSlice";

import BasicModal from "components/common/modal/BasicModal";
import LoginModal from "components/common/modal/LoginModal";
import WriteModal from "components/features/select/WriteModal";

import Header from "components/common/Header";
import Layout from "components/common/Layout";
import Search from "components/common/Search";
import Category from "components/features/select/Category";
import SelectItem from "components/common/SelectItem";
import Nav from "components/common/Nav";
import WriteButton from "components/elements/WriteButton";

import useInfiniteScroll from "hooks/useInfiniteScroll";
import useGetSelect from "hooks/useGetSelect";
import useModalState from "hooks/useModalState";

import Logo from "static/images/Logo.svg";
import IconSurvey from "static/icons/Variety=Survey, Status=untab, Size=L.svg";
import { fontMedium } from "shared/themes/textStyle";
import styled from "styled-components";

export const FEEDBACK_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSeHPoDci-rlaFfTEteUDaJXwnoVvvLUKDBQ831gb1o1U6fF5A/viewform";

const Select = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { page, setLastItemRef, refreshPage } = useInfiniteScroll();
  const { data, selected, error } = useGetSelect(page);

  const [loginModal, handleLoginModal] = useModalState(false);
  const [writeModal, handleWriteModal] = useModalState(false);

  return (
    <>
      {error && <BasicModal handleClick={() => dispatch(clearError())}>{error}</BasicModal>}
      {loginModal && <LoginModal handleClick={handleLoginModal} />}
      {writeModal && <WriteModal handleClick={handleWriteModal} />}

      <Header w={"4.5rem"}>
        <img onClick={() => window.location.reload()} src={Logo} alt="Logo" />
        <div />
        <a href={FEEDBACK_LINK} target="_blank" rel="noreferrer">
          <img src={IconSurvey} alt="IconSurvey" />
        </a>
      </Header>

      <Search
        query={selected.query}
        refreshPage={refreshPage}
        clearQuery={clearQuery}
        getListBySearch={__getSelectBySearch}
        text="고민 투표/제목 검색(10자 이내)"
      />

      <Category
        filter={selected.filter}
        category={selected.category}
        proceeding={selected.proceeding}
        length={data.length}
        refreshPage={refreshPage}
      />

      <Layout>
        <S.Container>
          {!data.length && <span>투표가 없습니다.</span>}
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

      <WriteButton
        pathname={pathname}
        handleWriteModal={handleWriteModal}
        handleLoginModal={handleLoginModal}
      />

      <Nav nowLocation={pathname} />
    </>
  );
};

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;

    padding: 17rem 0 9.6rem 0;

    > span {
      margin-top: 4rem;
      ${fontMedium};
    }
  `,
};

export default Select;
