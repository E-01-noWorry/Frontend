import React, { useState } from "react";
import imageCompression from "browser-image-compression";

import { borderBoxDefault } from "shared/themes/boxStyle";
import { fontBold, fontSmall } from "shared/themes/textStyle";
import IconImage from "static/icons/Variety=image, Status=untab, Size=S.svg";
import IconImageDelete from "static/icons/Variety=image delete, Status=Untab, Size=L.svg";
import styled from "styled-components";

const WriteImageUpload = ({ setImages, num }) => {
  const [previewImg, setPreviewImg] = useState({});

  //이미지 미리보기
  const encodeFile = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewImg((prev) => ({ ...prev, [name]: reader.result }));
        resolve();
      };
    });
  };

  //이미지 images에 담기
  const handleFile = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];

    //이미지 리사이징
    imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }).then((compressedFile) => {
      //리사이징 후에 파일이 blob으로 바뀌므로 다시 파일로 변환해준다
      const newFile = new File([compressedFile], file.name, {
        type: file.type,
      });
      encodeFile(newFile, name);
      setImages((prev) => ({ ...prev, [name]: newFile }));
    });
  };

  //이미지 삭제(previewImg, images에 담긴 이미지 모두 삭제해준다)
  const handlePreviewDelete = (payload) => {
    setPreviewImg((prev) => ({ ...prev, [payload]: "" }));
    setImages((prev) => ({ ...prev, [payload]: "" }));
  };

  return (
    <>
      {previewImg[num] ? (
        <S.PreviewContainer previewImg={previewImg[num]}>
          <div onClick={() => handlePreviewDelete(num)}>
            <img src={IconImageDelete} alt="IconImageDelete" />
            <span>삭제</span>
          </div>
        </S.PreviewContainer>
      ) : (
        <S.LabelContainer>
          <input
            name={num}
            hidden
            type="file"
            accept="image/*"
            onChange={(event) => handleFile(event)}
          />
          <img src={IconImage} alt="IconImage" />
          <span>이미지 첨부(선택)</span>
        </S.LabelContainer>
      )}
    </>
  );
};

const S = {
  PreviewContainer: styled.div`
    ${borderBoxDefault};
    height: 15rem;
    margin-top: 2.8rem;

    background: url(${(props) => props.previewImg});
    background-size: cover;
    background-position: center center;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      cursor: pointer;

      span {
        ${fontSmall};
        ${fontBold};
        line-height: 2rem;
        color: #fff;
        text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
      }
    }
  `,

  LabelContainer: styled.label`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    cursor: pointer;

    span {
      ${fontSmall};
      ${fontBold};
      line-height: 2rem;
      color: ${({ theme }) => theme.sub1};
    }
  `,
};

export default WriteImageUpload;
