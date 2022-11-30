import React from "react";
import { useNavigate } from "react-router-dom";

import { userStorage } from "shared/utils/localStorage";

import { fontBold } from "shared/themes/textStyle";
import IconEdit from "static/icons/Variety=edit, Status=untab, Size=L.svg";
import IconVoteTab from "static/icons/Variety=vote, Status=tab, Size=L.svg";
import IconChatting from "static/icons/Variety=chating, Status=untab, Size=L.svg";
import IconPerson from "static/icons/Variety=profile, Status=tab, Size=L.svg";
import IconNext from "static/icons/Variety=next, Status=untab, Size=M.svg";
import styled from "styled-components";

export const QNA_LINK = "https://forms.gle/daCzxS5nhRZXzrUr9";

const MyService = ({ handleLoginModal, handleUserDeleteModal }) => {
  const navigate = useNavigate();

  const handleClickService = (path) => {
    if (!userStorage.getToken()) {
      handleLoginModal();
    } else {
      navigate(`/${path}`);
    }
  };

  const handleClickUserDelete = () => {
    if (!userStorage.getToken()) {
      handleLoginModal();
    } else {
      handleUserDeleteModal();
    }
  };

  return (
    <>
      <S.Title>고민투표</S.Title>
      <S.ItemContainer>
        <div onClick={() => handleClickService("postvoted")}>
          <img src={IconEdit} alt="IconEdit" />
          <span>내가 등록한 고민 투표</span>
          <img src={IconNext} alt="IconNext" />
        </div>

        <div onClick={() => handleClickService("voted")}>
          <img src={IconVoteTab} alt="IconVoteTab" />
          <span>내가 투표한 고민 투표</span>
          <img src={IconNext} alt="IconNext" />
        </div>
      </S.ItemContainer>

      <S.Title>고민상담</S.Title>
      <S.ItemContainer>
        <div onClick={() => handleClickService("maderoom")}>
          <img src={IconEdit} alt="IconEdit" />
          <span>내가 만든 고민 상담방</span>
          <img src={IconNext} alt="IconNext" />
        </div>

        <div onClick={() => handleClickService("operatingroom")}>
          <img src={IconChatting} alt="IconChatting" />
          <span>대화중인 고민 상담방</span>
          <img src={IconNext} alt="IconNext" />
        </div>
      </S.ItemContainer>

      <S.Title>고객센터</S.Title>
      <S.ItemContainer>
        <a href={QNA_LINK} target="_blank" rel="noreferrer">
          <img src={IconEdit} alt="IconEdit" />
          <span>1 : 1 문의</span>
          <img src={IconNext} alt="IconNext" />
        </a>

        <div onClick={handleClickUserDelete}>
          <img src={IconPerson} alt="IconPerson" />
          <span>회원 탈퇴</span>
          <img src={IconNext} alt="IconNext" />
        </div>
      </S.ItemContainer>
    </>
  );
};

const S = {
  Title: styled.span`
    display: block;
    margin-top: 3.2rem;

    ${fontBold};
    color: ${({ theme }) => theme.sub2};
  `,

  ItemContainer: styled.article`
    margin-top: 1.6rem;
    background-color: ${({ theme }) => theme.white};

    border-radius: 2rem;

    div,
    a {
      display: grid;
      grid-template-columns: 3.25rem auto 2.4rem;
      align-items: center;

      height: 5.2rem;
      padding: 0 0.8rem 0 1.6rem;

      cursor: pointer;

      span {
        margin-left: 1rem;
      }
    }
  `,
};

export default MyService;
