import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "app/module/instance";

import BasicModal from "components/common/modal/BasicModal";

import Header from "components/common/Header";
import Layout from "components/common/Layout";
import ImageUpload from "components/features/write/ImageUpload";
import GlobalButton from "components/elements/GlobalButton";
import TimeSlide from "components/features/write/TimeSlide";

import useModalState from "hooks/useModalState";

import { CATEGORY_ARR } from "shared/utils/arr";
import { fontBold, fontMedium, fontSmall } from "shared/themes/textStyle";
import { borderBoxDefault } from "shared/themes/boxStyle";
import IconBack from "static/icons/Variety=back, Status=untab, Size=L.svg";
import IconAdd from "static/icons/Variety=add, Status=untab, Size=L.svg";
import styled from "styled-components";

const WriteSelect = () => {
  const navigate = useNavigate();

  const [numArr, setNumArr] = useState([1, 2]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState({ 1: "", 2: "" });
  const [images, setImages] = useState({ 1: "", 2: "" });
  const [time, setTime] = useState(1);

  const [modal, handleModal, message] = useModalState(false);
  const [uploadModal, handleUploadModal, uploadMessage] = useModalState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //선택지 핸들러
  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setOptions((prev) => ({ ...prev, [name]: value }));
  };

  //선택지 추가 핸들러
  const handleOptionAdd = () => {
    setNumArr([...numArr, numArr[numArr.length - 1] + 1]);
  };

  //선택지 삭제 핸들러
  const handleOptionDelete = (payload) => {
    setNumArr(numArr.filter((num) => num !== payload));
    setOptions((prev) => ({ ...prev, [payload]: "" }));
    setImages((prev) => ({ ...prev, [payload]: "" }));
  };

  //고민 게시글 작성 POST API
  const handleSubmit = async () => {
    const optionArr = Object.values(options).filter((option) => option !== "");
    const imageArr = Object.values(images).filter((image) => image !== "");

    if (imageArr.length !== 0 && optionArr.length !== imageArr.length) {
      handleModal("사진과 선택지의 개수가 다릅니다.");
    } else {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("options", optionArr);
      formData.append("time", time);

      if (imageArr[0]) {
        for (let i = 0; i < imageArr.length; i++) {
          formData.append("image", imageArr[i]);
        }
      }

      try {
        await instance.post("/select", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        handleUploadModal("게시글 등록 완료!");
      } catch (error) {
        handleModal(error.response.data.errMsg);
      }
    }
  };

  return (
    <>
      {modal && <BasicModal handleClick={handleModal}>{message}</BasicModal>}
      {uploadModal && (
        <BasicModal handleClick={() => navigate("/select")}>{uploadMessage}</BasicModal>
      )}

      <Header>
        <img onClick={() => navigate(-1)} src={IconBack} alt="IconBack" />
        <h1>투표 만들기</h1>
      </Header>

      <Layout>
        <S.Container>
          <S.Title>고민 작성</S.Title>
          <S.TextContainer>
            <textarea
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={60}
              placeholder="고민을 작성해주세요."
              style={{ height: "8.9rem" }}
            />
            <span>{title.length}/60자</span>
          </S.TextContainer>

          <S.Title>카테고리 선택</S.Title>
          <S.CategoryContainer>
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
          </S.CategoryContainer>

          <S.Title>선택지 작성</S.Title>
          <S.OptionContainer>
            {numArr.map((num, idx) => (
              <S.Option key={num}>
                <div>
                  <span>선택지 {idx + 1}</span>
                  {numArr.length > 2 && <span onClick={() => handleOptionDelete(num)}>삭제</span>}
                </div>

                <S.TextContainer mb="1.6rem">
                  <textarea
                    name={num}
                    value={options[num]}
                    onChange={handleOptionChange}
                    maxLength={15}
                    placeholder="선택지를 작성해주세요."
                  />
                  <span>{options[num]?.length || "0"}/15자</span>

                  <ImageUpload setImages={setImages} num={num} />
                </S.TextContainer>
              </S.Option>
            ))}

            {numArr.length < 4 && (
              <GlobalButton
                onClick={handleOptionAdd}
                bgc={({ theme }) => theme.white}
                font={({ theme }) => theme.black}
                fw={"bold"}
              >
                <img src={IconAdd} alt="IconAdd" />
                <span>선택지 추가하기</span>
              </GlobalButton>
            )}
          </S.OptionContainer>

          <S.Title>투표 종료시간 선택</S.Title>
          <TimeSlide time={time} setTime={setTime} />

          <S.Submit>
            <span>투표는 등록 후 수정이 불가능하니 유의해 주세요</span>
            <GlobalButton onClick={handleSubmit}>등록하기</GlobalButton>
          </S.Submit>
        </S.Container>
      </Layout>
    </>
  );
};

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;

    padding: 7.4rem 0 2rem 0;
  `,

  Title: styled.label`
    margin-bottom: 1.6rem;

    ${fontBold};
    line-height: 2.4rem;
  `,

  TextContainer: styled.article`
    ${borderBoxDefault};
    position: relative;

    align-items: flex-start;

    height: 100%;
    min-height: 12.1rem;
    padding: 1.6rem;
    margin-bottom: ${(props) => props.mb || "3.2rem"};
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

    > span {
      position: absolute;
      top: 8.6rem;
      right: 1.6rem;

      ${fontSmall};
      line-height: 2rem;
      color: ${({ theme }) => theme.sub1};
    }
  `,

  CategoryContainer: styled.article`
    ${borderBoxDefault};
    align-items: flex-start;

    height: 100%;
    margin-bottom: 3.2rem;
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

        cursor: pointer;
      }

      label {
        ${fontMedium};
        margin-left: 1.1rem;

        cursor: pointer;
      }
    }
  `,

  OptionContainer: styled.article`
    display: flex;
    flex-direction: column;

    margin-bottom: 3.2rem;
  `,

  Option: styled.div`
    > div:nth-child(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;

      span {
        margin-bottom: 1.6rem;

        ${fontSmall};
        ${fontBold};
        line-height: 2.1rem;
      }

      span:nth-child(2) {
        cursor: pointer;
      }
    }
  `,

  Submit: styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    margin-top: 4rem;

    span {
      margin-bottom: 1.6rem;

      ${fontSmall}
      line-height: 2rem;
    }
  `,
};

export default WriteSelect;
