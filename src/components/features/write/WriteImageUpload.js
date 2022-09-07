import React from 'react';
import { useState } from 'react';
import S3 from 'react-aws-s3';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { IconMedium, IconSmall } from '../../../shared/themes/iconStyle';
import { fontBold, fontSmall } from '../../../shared/themes/textStyle';

// window.Buffer = window.Buffer || require('buffer').Buffer;

const WriteImageUpload = ({ setImages, num }) => {
  //   // S3 이미지 업로드 후 images State에 이미지 URL 넣는 로직
  //   const config = {
  //     bucketName: 'mainproject-image-bucket',
  //     region: 'ap-northeast-2',
  //     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  //   };
  //   const ReactS3Client = new S3(config);

  //   const handleFileInput = (event) => {
  //     const { name } = event.target;
  //     const file = event.target.files[0];
  //     const newFileName = uuidv4(); //파일 이름 랜덤으로 바꿔주는 패키지
  //     ReactS3Client.uploadFile(file, newFileName)
  //       .then((data) => {
  //         setImages({ ...images, [name]: data.location });
  //       })
  //       .catch((err) => console.log(err));
  //   };

  const [previewImg, setPreviewImg] = useState({});

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

  const handleFileInput = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];

    encodeFile(file, name);
    setImages((prev) => ({ ...prev, [name]: file }));
  };

  const deletePreviewHandler = (payload) => {
    setPreviewImg((prev) => ({ ...prev, [payload]: '' }));
    setImages((prev) => ({ ...prev, [payload]: '' }));
  };

  return (
    <>
      {previewImg[num] ? (
        <StPreview previewImg={previewImg[num]}>
          <StDeleteButton onClick={() => deletePreviewHandler(num)}>
            <StCancelIcon></StCancelIcon>
            <span>삭제</span>
          </StDeleteButton>
        </StPreview>
      ) : (
        <StImageLabel>
          <input
            name={num}
            hidden
            type="file"
            accept="image/*"
            onChange={(event) => handleFileInput(event)}
          />
          <StImageIcon></StImageIcon>
          <StImageUpload>이미지 첨부(선택)</StImageUpload>
        </StImageLabel>
      )}
    </>
  );
};

export default WriteImageUpload;

const StImageLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StImageIcon = styled.div`
  ${IconSmall};
  background-color: green;
`;

const StImageUpload = styled.span`
  ${fontSmall}
  ${fontBold}
  line-height: 2rem;
`;

const StPreview = styled.div`
  ${borderBoxDefault};
  margin-top: 2.8rem;
  background: url(${(props) => props.previewImg});
  background-size: cover;
  background-position: center center;
`;

const StDeleteButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  span {
    ${fontSmall};
    ${fontBold};
    line-height: 2rem;

    color: #fff;
    text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
  }
`;

const StCancelIcon = styled.div`
  ${IconMedium};
  background-color: green;
`;
