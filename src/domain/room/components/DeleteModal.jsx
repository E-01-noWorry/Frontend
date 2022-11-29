import React, { useEffect, useState } from "react";
import { MS } from "common/components/modal/modalStyles";
import ProfileImg from "common/elements/ProfileImg";
import { fontMedium } from "shared/themes/textStyle";
import styled from "styled-components";

const DeleteModal = ({ socket, roomKey, userKey, handleClickDelete, handleClickLeave }) => {
  const [isSelect, setIsSelect] = useState(0);
  const [nowUser, setNowUser] = useState([]);

  useEffect(() => {
    socket.current.emit("showUsers", { roomKey, userKey });
    socket.current.on("receive", (data) => {
      setNowUser([...data]);
    });
  }, [socket, roomKey, userKey]);

  const recommendHandler = () => {
    if (isSelect === 0) return;

    socket.current.emit("recommend", { userKey: nowUser[isSelect]?.userKey, roomKey });
    handleClickLeave();
  };

  return (
    <>
      <MS.WindowWide>
        <MS.TitleConatiner>고민해결에 도움 된 사람을 추천해주세요</MS.TitleConatiner>

        <MS.TextContainerWide>
          {nowUser.length === 1 ? (
            <div>남아있는 인원이 없어요.</div>
          ) : (
            <>
              <div>*현재 상담방에 남아 있는 사람입니다.</div>
              <S.UserList number={isSelect}>
                {nowUser.slice(1).map((user, idx) => (
                  <S.User key={user.userKey} htmlFor={user.userKey}>
                    <ProfileImg point={user.point} size={"4rem"} />
                    <input
                      type="radio"
                      hidden
                      id={user.userKey}
                      checked={isSelect === idx + 1}
                      onChange={() => setIsSelect(idx + 1)}
                    />
                    <span>{user?.nickname}</span>
                  </S.User>
                ))}
              </S.UserList>
            </>
          )}
        </MS.TextContainerWide>

        <MS.ButtonContainer>
          {nowUser.length !== 1 && <div onClick={recommendHandler}>추천하고 삭제</div>}
          <div onClick={handleClickLeave}>상담방 삭제</div>
        </MS.ButtonContainer>
      </MS.WindowWide>
      <MS.Background onClick={handleClickDelete} />
    </>
  );
};

const S = {
  UserList: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    row-gap: 1.2rem;

    width: 28rem;
    min-height: 5.6rem;
    margin-top: 0.7rem;
    margin-bottom: 0.5rem;

    span {
      color: ${({ theme }) => theme.sub2};
      margin-top: 0.2rem;
    }

    //선택된 유저는 프로필에 메인컬러 보더가 생기고 닉네임이 메인 컬러로 변합니다
    label:nth-child(${(props) => props.number}) {
      div {
        border: 0.15rem solid ${({ theme }) => theme.main2};
      }

      span {
        color: ${({ theme }) => theme.main2};
      }
    }
  `,

  User: styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 8rem;

    span {
      ${fontMedium}
      line-height: 1.4rem;
    }
  `,
};

export default DeleteModal;
