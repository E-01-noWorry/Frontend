import styled from 'styled-components';

const ProfileImg = ({ className, children }) => {
  return <Profile className={className}>{children}</Profile>;
};
export default ProfileImg;

const Profile = styled.div`
  display: inline-block;

  width: 4rem;
  height: 4rem;
  background-color: #d9d9d9;

  border-radius: 999px;
`;
