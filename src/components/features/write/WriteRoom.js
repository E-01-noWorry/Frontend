import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../../../app/module/instance';
import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { IconLarge } from '../../../shared/themes/iconStyle';
import {
  fontBold,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';

const WriteRoom = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [countPeople, setCountPeople] = useState(2);

  const [keywordArr, setKeywordArr] = useState([]);

  const keywordHandler = (event) => {
    event.preventDefault();
    if (keywordArr.includes(keyword)) {
      alert('중복된 해시태그가 있네요');
    } else if (keywordArr.length >= 3) {
      alert('해시태그는 3개까지만이에요');
    } else {
      setKeywordArr((prev) => [...prev, keyword]);
    }
    setKeyword('');
  };

  const countPlusHandler = () => {
    if (countPeople < 9) {
      setCountPeople((prev) => prev + 1);
    }
  };

  const countMinusHandler = () => {
    if (countPeople > 2) {
      setCountPeople((prev) => prev - 1);
    }
  };

  const submitHandler = async () => {
    const payload = {
      title: title,
      hashTag: keywordArr,
      max: countPeople + 1,
    };
    try {
      const { data } = await instance.post('/room', payload);
      navigate(`/chatroom/${data.result.roomKey}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StHeader>
        <StHeaderIcon
          onClick={() => navigate('/', { state: 'room' })}
        ></StHeaderIcon>
        <h1>채팅방 만들기</h1>
        <StHeaderIcon />
      </StHeader>

      <StContainer>
        <StContentBox>
          <StInnerTitle>고민 상담방 이름 작성</StInnerTitle>
          <StInnerText>
            <textarea
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength="40"
              placeholder="고민 상담방 이름을 작성해주세요"
              style={{ height: '8.9rem' }}
            />
            <span>{title.length}/40자</span>
          </StInnerText>
        </StContentBox>

        <StContentBox>
          <StInnerTitle>해시태그 작성</StInnerTitle>
          <StInnerText>
            <form onSubmit={keywordHandler}>
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                maxLength={10}
                placeholder="해시태그를 작성하여 고민을 소개해보세요(10자 이내)"
              />
            </form>
            <div>
              {keywordArr?.map((item) => (
                <div key={item}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <span>{keywordArr.length}/3개</span>
          </StInnerText>
        </StContentBox>

        <StContentBox>
          <StInnerTitle>최대 참여 인원수</StInnerTitle>
          <StInnerSubtitle>
            본인을 제외한 참여자 인원을 정해주세요
          </StInnerSubtitle>
          <StCountBox>
            <StCountButton onClick={countMinusHandler}>-</StCountButton>
            <div>{countPeople}</div>
            <StCountButton onClick={countPlusHandler}>+</StCountButton>
          </StCountBox>
        </StContentBox>
        <StButton onClick={submitHandler}>만들기</StButton>
      </StContainer>
    </>
  );
};

export default WriteRoom;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.7rem;

  gap: 3.2rem;
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6.4rem;
`;

const StHeaderIcon = styled.div`
  ${IconLarge};
  background-color: green;
`;

const StContentBox = styled.div`
  width: 100%;
  height: 100%;
`;

const StInnerTitle = styled.div`
  ${fontBold};
  line-height: 2.4rem;

  height: 2.4rem;
  margin-bottom: 1.6rem;
`;

const StInnerSubtitle = styled.div`
  ${fontMedium};
  line-height: 2.1rem;

  margin-top: -1.2rem;
`;

const StCountBox = styled.div`
  ${borderBoxDefault};
  height: 7.6rem;
  padding: 1.4rem;
  margin-top: 2rem;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: #ededed;
`;

const StCountButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4.8rem;
  height: 4.8rem;
  border-radius: 1.4rem;

  background-color: #fff;
`;

const StInnerText = styled.div`
  position: relative;
  ${borderBoxDefault};
  height: 100%;
  min-height: 12.1rem;
  align-items: flex-start;
  padding: 1.6rem;

  background-color: #ededed;

  textarea {
    width: 100%;
    height: 6.9rem;

    background-color: transparent;
    resize: none;
    border: none;

    &:focus {
      outline: none;
    }
  }

  input {
    position: absolute;
    top: 1.8rem;

    width: 90%;
    background-color: transparent;
    border: none;

    &:focus {
      outline: none;
    }
  }

  & > span {
    ${fontSmall};
    line-height: 2rem;

    position: absolute;
    top: 8.6rem;
    right: 1.6rem;
  }
`;

const StButton = styled.div`
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;

  width: 100%;
  height: 5.6rem;
  border-radius: 2rem;

  ${fontBold};
  color: #fff;
`;
