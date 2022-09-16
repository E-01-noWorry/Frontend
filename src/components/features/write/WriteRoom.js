import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import instance from '../../../app/module/instance';

import BodyPadding from '../../common/BodyPadding';
import Header from '../../common/Header';
import GlobalButton from '../../elements/GlobalButton';

import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { IconLarge, IconSmall } from '../../../shared/themes/iconStyle';
import {
  fontBold,
  fontLarge,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';

import IconBack from '../../../static/icons/Variety=back, Status=untab.svg';
import IconErase from '../../../static/icons/Variety=erase, Status=untab, Size=S.svg';
import IconPlus from '../../../static/icons/Variety=plus, Status=untab, Size=XL.svg';
import IconMinus from '../../../static/icons/Variety=minus, Status=untab, Size=XL.svg';

import styled from 'styled-components';
import { ModalBasic } from '../../common/Modal';

const WriteRoom = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [keywordArr, setKeywordArr] = useState([]);
  const [countPeople, setCountPeople] = useState(1);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const keywordHandler = (event) => {
    event.preventDefault();

    if (keywordArr.includes(keyword)) {
      setModal('중복된 해시태그가 있습니다.');
    } else {
      setKeywordArr((prev) => [...prev, keyword.replace(' ', '')]);
    }

    setKeyword('');
  };

  const keywordDeleteHandler = (value) => {
    setKeywordArr((prev) => prev.filter((i) => i !== value));
  };

  const countPlusHandler = () => {
    if (countPeople < 8) {
      setCountPeople((prev) => prev + 1);
    }
  };

  const countMinusHandler = () => {
    if (countPeople > 1) {
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
      console.log(error.response.data.errMsg);
    }
  };

  return (
    <>
      {modal && <ModalBasic setter={() => setModal(false)}>{modal}</ModalBasic>}

      <Header>
        <StHeaderIcon onClick={() => navigate('/main', { state: 'room' })}>
          <img src={IconBack} alt="IconBack" />
        </StHeaderIcon>
        <StHeaderTitle>채팅방 만들기</StHeaderTitle>
        <StHeaderIcon />
      </Header>

      <BodyPadding>
        <StContainer>
          <StContentBox>
            <StInnerTitle>고민 상담방 이름 작성</StInnerTitle>
            <StInnerText>
              <textarea
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={20}
                placeholder="고민 상담방 이름을 작성해주세요"
                style={{ height: '8.9rem' }}
              />
              <span>{title.length}/20자</span>
            </StInnerText>
          </StContentBox>

          <StContentBox>
            <StInnerTitle>해시태그 작성</StInnerTitle>
            <StInnerText>
              <StKeywordWrap length={keywordArr.length}>
                {keywordArr?.map((item) => (
                  <StKeyword
                    key={item}
                    onClick={() => keywordDeleteHandler(item)}
                  >
                    <div>#{item}</div>
                    <StDeleteIcon>
                      <img src={IconErase} alt="IconErase" />
                    </StDeleteIcon>
                  </StKeyword>
                ))}
                <form onSubmit={keywordHandler}>
                  <input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    maxLength={7}
                    placeholder={
                      keywordArr.length === 0
                        ? '해시태그를 작성하여 고민을 소개해보세요(7자 이내)'
                        : '해시태그 추가'
                    }
                  />
                </form>
              </StKeywordWrap>

              <span>{keywordArr.length}/3개</span>
            </StInnerText>
          </StContentBox>

          <StContentBox>
            <StInnerTitle>최대 참여 인원수</StInnerTitle>
            <StInnerSubtitle>
              본인을 제외한 참여자 인원을 정해주세요 (1~8명)
            </StInnerSubtitle>
            <StCountBox>
              <StCountButton onClick={countMinusHandler}>
                <img src={IconMinus} alt="IconMinus" />
              </StCountButton>
              <div>{countPeople}</div>
              <StCountButton onClick={countPlusHandler}>
                <img src={IconPlus} alt="IconPlus" />
              </StCountButton>
            </StCountBox>
          </StContentBox>

          <GlobalButton onClick={submitHandler}>만들기</GlobalButton>
        </StContainer>
      </BodyPadding>
    </>
  );
};

export default WriteRoom;

const StHeaderIcon = styled.div`
  ${IconLarge};
`;

const StHeaderTitle = styled.div`
  ${fontLarge};
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  width: 100%;
  margin-top: 6.4rem;
  margin-bottom: 1.6rem;
`;

const StContentBox = styled.div`
  width: 100%;
  height: 100%;
`;

const StInnerTitle = styled.div`
  margin-bottom: 1.6rem;

  ${fontBold};
  line-height: 2.4rem;
`;

const StInnerText = styled.div`
  position: relative;

  ${borderBoxDefault};
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  height: 100%;
  min-height: 12.1rem;
  padding: 1.6rem;
  background-color: ${({ theme }) => theme.white};

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

  //글자수 표시
  & > span {
    position: absolute;
    top: 8.6rem;
    right: 1.6rem;

    ${fontSmall};
    line-height: 2rem;
    color: ${({ theme }) => theme.sub1};
  }
`;

const StKeywordWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.8rem;
  row-gap: 1rem;

  input {
    display: ${(props) => (props.length >= 3 ? 'none' : 'block')};

    width: ${(props) => (props.length === 0 ? '210%' : null)};
    height: 3.2rem;
    background-color: transparent;

    border: none;

    &:focus {
      outline: none;
    }
  }
`;

const StKeyword = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  height: 3.2rem;
  padding: 1.1rem 0.7rem 1.1rem 1.1rem;
  background-color: ${({ theme }) => theme.sub4};

  border-radius: 1.6rem;

  div {
    ${fontMedium};
  }
`;

const StDeleteIcon = styled.div`
  ${IconSmall}
`;

const StInnerSubtitle = styled.div`
  margin-top: -1.2rem;

  ${fontMedium};
  line-height: 2.1rem;
  color: ${({ theme }) => theme.sub2};
`;

const StCountBox = styled.div`
  ${borderBoxDefault};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 7.6rem;
  padding: 1.4rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.white};

  & > div:nth-child(2) {
    ${fontBold};
    ${fontLarge}
  }
`;

const StCountButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4.8rem;
  height: 4.8rem;
  background-color: ${({ theme }) => theme.sub4};

  border-radius: 1.4rem;

  img {
  }
`;
