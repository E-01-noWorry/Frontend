import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import instance from '../../../app/module/instance';

import { ModalBasic } from '../../common/Modal';
import GlobalButton from '../../elements/GlobalButton';
import BodyPadding from '../../common/BodyPadding';
import Header from '../../common/Header';
import WriteImageUpload from './WriteImageUpload';
import TimeSlide from './TimeSlide';

import { CATEGORY_ARR } from '../../../shared/Array';

import {
  fontBold,
  fontLarge,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';
import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { IconLarge, IconMedium } from '../../../shared/themes/iconStyle';

import IconBack from '../../../static/icons/Variety=back, Status=untab, Size=L.svg';
import IconAdd from '../../../static/icons/Variety=add, Status=untab, Size=L.svg';

import styled from 'styled-components';

const WriteSelect = () => {
  const navigate = useNavigate();

  const [numArr, setNumArr] = useState([1, 2]);
  const [modal, setModal] = useState('');
  const [uploadModal, setUploadModal] = useState('');

  //서버에 전송할 payload
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [options, setOptions] = useState({ 1: '', 2: '' });
  const [images, setImages] = useState({ 1: '', 2: '' });
  const [time, setTime] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //선택지 핸들러
  const optionChangeHandler = (event) => {
    const { name, value } = event.target;
    setOptions({ ...options, [name]: value });
  };

  //선택지 추가 핸들러
  const optionAddHandler = () => {
    setNumArr([...numArr, numArr[numArr.length - 1] + 1]);
  };

  //선택지 삭제 핸들러
  const optionDeleteHandler = (payload) => {
    setNumArr(numArr.filter((num) => num !== payload));
    setOptions({ ...options, [payload]: '' });
    setImages((prev) => ({ ...prev, [payload]: '' }));
  };

  //고민 게시글 작성 POST API
  const submitHandler = async () => {
    const optionArr = Object.values(options).filter((option) => option !== '');
    const imageArr = Object.values(images).filter((image) => image !== '');

    if (imageArr.length !== 0 && optionArr.length !== imageArr.length) {
      setModal('사진과 선택지의 개수가 다릅니다.');
      document.body.style.overflow = 'hidden';
    } else {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('category', category);
      formData.append('options', optionArr);
      formData.append('time', time);

      if (imageArr[0]) {
        for (let i = 0; i < imageArr.length; i++) {
          formData.append('image', imageArr[i]);
        }
      }

      try {
        await instance.post('/select', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUploadModal('게시글 등록 완료!');
        document.body.style.overflow = 'hidden';
      } catch (error) {
        setModal(error.response.data.errMsg);
        document.body.style.overflow = 'hidden';
      }
    }
  };

  return (
    <>
      {uploadModal && (
        <ModalBasic
          setter={() => {
            navigate('/main', { state: { now: 'select' } });
            document.body.style.overflow = 'unset';
          }}
        >
          {uploadModal}
        </ModalBasic>
      )}

      {modal && (
        <ModalBasic
          setter={() => {
            setModal('');
            document.body.style.overflow = 'unset';
          }}
        >
          {modal}
        </ModalBasic>
      )}

      <Header>
        <StHeaderIcon
          onClick={() => navigate('/main', { state: { now: 'select' } })}
        >
          <img src={IconBack} alt="IconBack" />
        </StHeaderIcon>
        <StHeaderTitle>투표 만들기</StHeaderTitle>
        <StHeaderIcon />
      </Header>

      <BodyPadding>
        <StContainer>
          <StContentBox>
            <StInnerTitle>고민 작성</StInnerTitle>
            <StInnerText>
              <textarea
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={40}
                placeholder="고민을 작성해주세요."
                style={{ height: '8.9rem' }}
              />
              <span>{title.length}/40자</span>
            </StInnerText>
          </StContentBox>

          <StContentBox>
            <StInnerTitle>카테고리 선택</StInnerTitle>
            <StInnerCategory>
              {CATEGORY_ARR.slice(1).map((item) => (
                <div key={item} onClick={() => setCategory(item)}>
                  <input
                    type="radio"
                    id={item}
                    checked={category === item}
                    onChange={() => setCategory(item)}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </StInnerCategory>
          </StContentBox>

          <StContentBox>
            <StInnerTitle>선택지 작성</StInnerTitle>
            <StInnerOptions>
              {numArr.map((num, idx) => (
                <div key={num}>
                  <StInnerSubtitle>
                    <div>선택지 {idx + 1}</div>

                    {numArr.length > 2 && (
                      <div onClick={() => optionDeleteHandler(num)}>삭제</div>
                    )}
                  </StInnerSubtitle>
                  <StInnerText>
                    <textarea
                      name={num}
                      value={options[num]}
                      onChange={optionChangeHandler}
                      maxLength={15}
                      placeholder="선택지를 작성해주세요."
                    />
                    <span>{options[num]?.length || '0'}/15자</span>
                    <WriteImageUpload setImages={setImages} num={num} />
                  </StInnerText>
                </div>
              ))}
            </StInnerOptions>
          </StContentBox>

          <StContentBox>
            {numArr.length < 4 && (
              <GlobalButton
                onClick={optionAddHandler}
                bgc={({ theme }) => theme.white}
                font={({ theme }) => theme.black}
                fw={'bold'}
              >
                <StPlusIcon>
                  <img src={IconAdd} alt="IconAdd" />
                </StPlusIcon>
                <span>선택지 추가하기</span>
              </GlobalButton>
            )}
          </StContentBox>

          <StContentBox>
            <StInnerTitle>투표 종료시간 선택</StInnerTitle>
            <TimeSlide time={time} setTime={setTime} />
          </StContentBox>

          <StInnerSubmit>
            <span>투표는 등록 후 수정이 불가능하니 유의해 주세요</span>
            <GlobalButton onClick={submitHandler}>등록하기</GlobalButton>
          </StInnerSubmit>
        </StContainer>
      </BodyPadding>
    </>
  );
};

export default WriteSelect;

const StHeaderIcon = styled.div`
  ${IconLarge};
`;

const StHeaderTitle = styled.div`
  ${fontLarge};
`;

const StContainer = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    padding: 0 2rem 2rem 2rem;
  }

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  width: 100%;
  margin-top: 6.4rem;
  margin-bottom: 1.6rem;
  background-color: ${({ theme }) => theme.bg};
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

  & > span {
    position: absolute;
    top: 8.6rem;
    right: 1.6rem;

    ${fontSmall};
    line-height: 2rem;
    color: ${({ theme }) => theme.sub1};
  }
`;

const StInnerCategory = styled.div`
  ${borderBoxDefault};
  align-items: flex-start;

  height: 100%;
  background-color: ${({ theme }) => theme.white};

  div {
    display: flex;
    align-items: center;

    width: 100%;
    height: 5.6rem;
    padding: 0 1.1rem;

    input {
      width: 2.2rem;
      height: 2.2rem;
      accent-color: ${({ theme }) => theme.black};
    }

    label {
      ${fontMedium};
      margin-left: 1.1rem;
    }
  }
`;

const StInnerOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StInnerSubtitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  div {
    margin-bottom: 1.6rem;

    ${fontSmall}
    ${fontBold}
    line-height: 2.1rem;
  }
`;

const StPlusIcon = styled.div`
  ${IconMedium};
`;

const StInnerSubmit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  span {
    margin-bottom: 1.6rem;

    ${fontSmall}
    line-height: 2rem;
  }
`;
