import styled from 'styled-components';

const GoogleLogin = () => {
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_CALLBACK_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  return (
    <a href={GOOGLE_AUTH_URL}>
      <Google>구글</Google>
    </a>
  );
};
export default GoogleLogin;

const Google = styled.button`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: black;
  background-color: #fff;
  width: 49%;
  margin-left: 1%;
  height: 4rem;
  font-size: 1.6rem;
  line-height: 150%;
  margin-top: 1.6rem;
  font-weight: 700;
  font-size: 1.3rem;
  border: 1px solid black;

  letter-spacing: -0.05rem;

  border-radius: 20px;
`;
