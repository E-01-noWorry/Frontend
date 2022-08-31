import React from 'react';
/////////////////////////////////////////////////////////////////
//Amazon S3 이미지 관련 임포트
import S3 from 'react-aws-s3';
import { v4 as uuidv4 } from 'uuid';
/////////////////////////////////////////////////////////////////

window.Buffer = window.Buffer || require('buffer').Buffer;

const WriteImageUpload = ({ setImages, images, num }) => {
  //////////////////////////////////////////////////////////////
  // S3 이미지 업로드 후 images State에 이미지 URL 넣는 로직
  const config = {
    bucketName: 'mainproject-image-bucket',
    region: 'ap-northeast-2',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  };
  const ReactS3Client = new S3(config);

  const handleFileInput = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    const newFileName = uuidv4(); //파일 이름 랜덤으로 바꿔주는 패키지
    ReactS3Client.uploadFile(file, newFileName)
      .then((data) => {
        setImages({ ...images, [name]: data.location });
      })
      .catch((err) => console.log(err));
  };
  //////////////////////////////////////////////////////////////

  return (
    <input
      name={num}
      type="file"
      accept="image/*"
      onChange={(event) => handleFileInput(event)}
    />
  );
};

export default WriteImageUpload;
