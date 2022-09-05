import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../../app/module/instance';
import WriteImageUpload from './WriteImageUpload';
import { TIME_ARR, CATEGORY_ARR } from '../../../shared/Array';
import styled from 'styled-components';
import {
  fontBold,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';
import { borderBoxDefault } from '../../../shared/themes/boxStyle';

const WriteSelect = () => {
  const navigate = useNavigate();

  //서버에 전송할 payload를 관리하는 State
  const [numArr, setNumArr] = useState([1, 2]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [options, setOptions] = useState({ 1: '', 2: '' });
  const [images, setImages] = useState({ 1: '', 2: '' });
  const [time, setTime] = useState(1);

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
  };

  //마감시간 설정 핸들러
  const timeHandler = (event) => {
    const time = event.target.getAttribute('time');
    setTime(time);
  };

  //고민 게시글 작성 POST API
  const submitHandler = async () => {
    const payload = {
      title: title,
      category: category,
      options: Object.values(options).filter((option) => option !== ''),
      image: Object.values(images).filter((image) => image !== ''),
      time: parseInt(time),
    };
    try {
      await instance.post('/select', payload);
      navigate('/', { state: 'select' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StContainer>
      <div>
        <button onClick={() => navigate('/', { state: 'select' })}>
          뒤로 가기
        </button>
        <h1>투표 만들기</h1>
      </div>

      <StContentBox>
        <StInnerTitle>고민 작성</StInnerTitle>
        <StInnerText>
          <textarea
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength="80"
            placeholder="고민을 작성해주세요"
          />
          <span>{title.length}/80자</span>
        </StInnerText>
      </StContentBox>

      <StContentBox>
        <StInnerTitle>카테고리 선택</StInnerTitle>
        <StInnerCategory>
          {CATEGORY_ARR.map((item) => (
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
                  maxLength="40"
                  placeholder="선택지를 작성해주세요"
                />
                <WriteImageUpload
                  setImages={setImages}
                  images={images}
                  num={num}
                />
                <span>{options[num]?.length || '0'}/40자</span>
              </StInnerText>
            </div>
          ))}
        </StInnerOptions>
        {numArr.length < 4 && (
          <button onClick={optionAddHandler}>선택지 추가하기</button>
        )}
      </StContentBox>

      <StContentBox>
        <StInnerTitle>투표 종료시간 선택</StInnerTitle>
        <StInnerButton selectTime={time}>
          {TIME_ARR.map((time) => (
            <div key={time} time={time} onClick={timeHandler}>
              {time}시간
            </div>
          ))}
          <StInnerTime time={time}></StInnerTime>
        </StInnerButton>
      </StContentBox>

      <StInnerSubmit>
        <span>투표는 등록 후 수정이 불가능하니 유의해 주세요</span>
        <button onClick={submitHandler}>등록하기</button>
      </StInnerSubmit>
    </StContainer>
  );
};

export default WriteSelect;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 3.2rem;
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

const StInnerText = styled.div`
  position: relative;
  ${borderBoxDefault};
  height: 12.1rem;
  align-items: flex-start;
  padding: 1.6rem;

  background-color: #ededed;

  textarea {
    width: 100%;
    height: 100%;

    background-color: transparent;
    resize: none;
    border: none;

    &:focus {
      outline: none;
    }
  }

  & > span {
    ${fontSmall};
    position: absolute;
    bottom: 1.6rem;
    right: 1.6rem;
  }
`;

const StInnerCategory = styled.div`
  ${borderBoxDefault};
  align-items: flex-start;
  height: 100%;

  background-color: #fff;

  div {
    display: flex;
    width: 100%;
    height: 5.6rem;
    align-items: center;
    padding: 0 1.1rem;

    input {
      width: 2.2rem;
      height: 2.2rem;
      accent-color: #000;
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
    ${fontSmall}
    ${fontBold}
    line-height: 2.1rem;

    height: 2.1rem;
    margin-bottom: 1.6rem;
  }
`;

const StInnerButton = styled.div`
  position: relative;
  display: flex;

  div {
    ${fontMedium}
    display: flex;
    justify-content: center;
    align-items: center;
    transition-delay: 0.1s;
    width: 20%;
    height: 4rem;
    background-color: transparent;
    border: none;
  }

  div:nth-child(1) {
    color: #fff;
    ${fontBold}
  }

  div:nth-child(2) {
    color: ${(props) => props.selectTime != 1 && '#fff'};
    ${(props) => props.selectTime != 1 && fontBold};
  }

  div:nth-child(3) {
    color: ${(props) =>
      props.selectTime != 1 && props.selectTime != 4 && '#fff'};
    ${(props) => props.selectTime != 1 && props.selectTime != 4 && fontBold};
  }

  div:nth-child(4) {
    color: ${(props) =>
      props.selectTime != 1 &&
      props.selectTime != 4 &&
      props.selectTime != 8 &&
      '#fff'};
    ${(props) =>
      props.selectTime != 1 &&
      props.selectTime != 4 &&
      props.selectTime != 8 &&
      fontBold};
  }

  div:nth-child(5) {
    color: ${(props) =>
      props.selectTime != 1 &&
      props.selectTime != 4 &&
      props.selectTime != 8 &&
      props.selectTime != 12 &&
      '#fff'};
    ${(props) =>
      props.selectTime != 1 &&
      props.selectTime != 4 &&
      props.selectTime != 8 &&
      props.selectTime != 12 &&
      fontBold};
  }
`;

const StInnerTime = styled.span`
  background-color: #454545;
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  transition-duration: 0.3s;
  width: ${(props) => {
    if (props.time == 1) {
      return '20%';
    } else if (props.time == 4) {
      return '40%';
    } else if (props.time == 8) {
      return '60%';
    } else if (props.time == 12) {
      return '80%';
    } else if (props.time == 24) {
      return '100%';
    }
  }};
  height: 4rem;
  border-radius: 2rem;
  z-index: -1;
`;

const StInnerSubmit = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  align-items: center;

  span {
    ${fontSmall}
    height: 2rem;
    line-height: 1.95rem;
    margin-bottom: 1.6rem;
  }
`;
