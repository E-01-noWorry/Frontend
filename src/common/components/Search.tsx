import React, { useState } from "react";
import { useAppDispatch } from "app/config/hooks";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

import { fontMedium } from "shared/themes/textStyle";
import { IconMedium } from "shared/themes/iconStyle";
import IconSearch from "static/icons/Variety=search, Status=untab, Size=M.svg";
import styled from "styled-components";

interface Props {
  query: string;
  refreshPage: () => void;
  clearQuery: ActionCreatorWithoutPayload<string>;
  getListBySearch: any;
  text: string;
}

const Search = ({ query, refreshPage, clearQuery, getListBySearch, text }: Props) => {
  const dispatch = useAppDispatch();
  const [searchWord, setSearchWord] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleCancel = () => {
    if (!query) return;

    refreshPage();
    dispatch(clearQuery());
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getListBySearch(searchWord));
    setSearchWord("");
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleOnSubmit}>
        <input value={searchWord} onChange={handleOnChange} maxLength={10} placeholder={text} />
        <button type="submit">
          <img src={IconSearch} alt="IconSearch" />
        </button>
      </S.Form>

      <S.Cancel onClick={handleCancel}>취소</S.Cancel>
    </S.Container>
  );
};

const S = {
  Container: styled.section`
    @media ${({ theme }) => theme.device.PC} {
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    position: fixed;
    top: 6.4rem;

    display: grid;
    grid-template-columns: auto 6rem;
    align-items: center;

    width: 100%;
    height: 6.4rem;
    padding: 0 2rem;
    background-color: ${({ theme }) => theme.color.bg};

    z-index: 9;
  `,

  Form: styled.form`
    position: relative;
    width: 100%;

    input {
      width: 100%;
      height: 4rem;
      padding: 0 1.5rem;
      background-color: ${({ theme }) => theme.color.white};

      border: none;
      border-radius: 2rem;

      &:focus {
        outline: none;
      }
    }

    button {
      position: absolute;
      top: 0.8rem;
      right: 0.8rem;
      ${IconMedium};
    }
  `,

  Cancel: styled.button`
    ${fontMedium};
  `,
};

export default Search;
