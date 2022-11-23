import profileBlue from "static/images/profiles/Property 1=Blue, Property 2=L.svg";
import profileGreen from "static/images/profiles/Property 1=Green, Property 2=L.svg";
import profilePurple from "static/images/profiles/Property 1=Purple, Property 2=L.svg";
import profileWhite from "static/images/profiles/Property 1=White, Property 2=L.svg";
import profileYellow from "static/images/profiles/Property 1=Yellow, Property 2=L.svg";

import styled from "styled-components";

const ProfileImg = ({ point, size }) => {
  return (
    <Profile size={size}>
      {0 <= point && point <= 10 ? (
        <img src={profileWhite} alt="profileWhite" />
      ) : 11 <= point && point <= 25 ? (
        <img src={profileYellow} alt="profileYellow" />
      ) : 26 <= point && point <= 50 ? (
        <img src={profileGreen} alt="profileGreen" />
      ) : 51 <= point && point <= 100 ? (
        <img src={profileBlue} alt="profileBlue" />
      ) : 101 <= point ? (
        <img src={profilePurple} alt="profilePurple" />
      ) : null}
    </Profile>
  );
};
export default ProfileImg;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => props.size || "100%"};
  height: ${(props) => props.size || "100%"};

  border-radius: 50%;

  img {
    width: 100%;
  }
`;
