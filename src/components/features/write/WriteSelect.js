import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WriteImageUpload from './WriteImageUpload';
import { __postSelect } from '../../../app/module/selectSlice';
import { TIME_ARR, CATEGORY_ARR } from '../../../shared/array';
import styled from 'styled-components';

const WriteSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [numArr, setNumArr] = useState([1, 2]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [options, setOptions] = useState({ 1: '', 2: '' });
  const [images, setImages] = useState({ 1: '', 2: '' });
  const [time, setTime] = useState(1);

  const optionChangeHandler = (event) => {
    const { name, value } = event.target;
    setOptions({ ...options, [name]: value });
  };

  const optionAddHandler = () => {
    if (numArr.length >= 4) {
      alert('선택지는 최대 4개까지 작성 가능합니다');
    } else {
      setNumArr([...numArr, numArr[numArr.length - 1] + 1]);
    }
  };

  const optionDeleteHandler = (payload) => {
    if (numArr.length <= 2) {
      alert('선택지는 최소 2개가 있어야 합니다');
    } else {
      setNumArr(numArr.filter((num) => num !== payload));
      setOptions({ ...options, [payload]: '' });
    }
  };

  const timeHandler = (event) => {
    const time = event.target.getAttribute('time');
    setTime(time);
  };

  const submitHandler = () => {
    const payload = {
      title: title,
      category: category,
      options: Object.values(options).filter((option) => option !== ''),
      image: Object.values(images).filter((image) => image !== ''),
      time: time,
    };
    dispatch(__postSelect(payload)).then(() => {
      navigate('/', { state: 'select' });
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate('/', { state: 'select' })}>
          뒤로 가기
        </button>
        <h1>투표 만들기</h1>
      </div>

      <div>
        <h2>고민 작성</h2>
        <div>
          <StTextArea
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength="80"
            placeholder="고민을 작성해주세요"
          />
          <span>{title.length}/80자</span>
        </div>
      </div>

      <div>
        <h2>카테고리 선택</h2>
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
      </div>

      <div>
        <h2>선택지 작성</h2>
        {numArr.map((num, idx) => (
          <StOptionBox key={num}>
            <div>
              <h3>선택지 {idx + 1}</h3>
              {num > 2 ? (
                <button onClick={() => optionDeleteHandler(num)}>
                  선택지 삭제
                </button>
              ) : null}
            </div>
            <div>
              <textarea
                name={num}
                value={options[num]}
                onChange={optionChangeHandler}
                maxLength="40"
                placeholder="선택지를 작성해주세요"
              />
              <div>
                <WriteImageUpload
                  setImages={setImages}
                  images={images}
                  num={num}
                />
                <span>{options[num]?.length || '0'}/40자</span>
              </div>
            </div>
          </StOptionBox>
        ))}
        <button onClick={optionAddHandler}>선택지 추가</button>
      </div>

      <div>
        <h2>투표 종료시간 선택</h2>
        <div>
          {TIME_ARR.map((time) => (
            <button key={time} time={time} onClick={timeHandler}>
              {time}시간
            </button>
          ))}
        </div>
      </div>

      <div>
        <span>투표는 등록 후 수정이 불가능하니 유의해 주세요</span>
        <button onClick={submitHandler}>등록하기</button>
      </div>
    </div>
  );
};

export default WriteSelect;

const StTextArea = styled.textarea`
  background-color: aliceblue;
  width: 33.5rem;
  height: 121px;
  resize: none;
  border: none;

  &:focus {
    outline: none;
  }
`;

const StOptionBox = styled.div`
  border: 1px solid red;
`;
