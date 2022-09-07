import styled from 'styled-components';

const ProfileImg = ({ className }) => {
  return <Profile className={className}></Profile>;
};
export default ProfileImg;

const Profile = styled.div`
  width: 4rem;
  height: 4rem;
  background: #d9d9d9;
  border-radius: 999px;
  display: inline-block;
`;
