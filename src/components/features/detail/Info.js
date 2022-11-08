import React from 'react';
import styled from 'styled-components';

import ProfileImg from '../../../components/elements/ProfileImg';

import { remainedTime } from '../../../shared/timeCalculation';

import { fontExtraBold, fontLarge, fontMedium } from '../../../shared/themes/textStyle';
import { IconSmall } from '../../../shared/themes/iconStyle';

import IconTimeWarning from '../../../static/icons/Variety=Time warning, Status=untab, Size=S.svg';
import IconTimeOver from '../../../static/icons/Variety=Timeover, Status=Untab, Size=S.svg';

const Info = ({ content }) => {
  return (
    <>
      <ProfileImg point={content.point} />

      <StNickname>{content.nickname}</StNickname>

      <StCategory>{content.category}</StCategory>

      <StTitle>{content.title}</StTitle>

      <StDeadLine>
        {content.completion ? (
          <>
            <StIcon>
              <img src={IconTimeOver} alt="IconTimeOver" />
            </StIcon>
            <span className="timeover">투표마감</span>
          </>
        ) : (
          <>
            <StIcon>
              <img src={IconTimeWarning} alt="IconTimeWarning" />
            </StIcon>
            <span className="deadline">{remainedTime(content.deadLine)}</span>
          </>
        )}
      </StDeadLine>
    </>
  );
};

export default Info;

const StNickname = styled.div`
  margin-top: 0.2rem;

  ${fontMedium}
  line-height: 2.1rem;
  color: ${({ theme }) => theme.sub2};
`;

const StCategory = styled.div`
  padding: 0 0.4rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.main2};

  border-radius: calc(2.1rem / 2);

  ${fontMedium};
  line-height: 2.1rem;
  color: ${({ theme }) => theme.white};
`;

const StTitle = styled.div`
  width: 100%;
  margin: 0.8rem 2rem;

  ${fontLarge};
  ${fontExtraBold};
  line-height: 3rem;
  text-align: center;

  word-wrap: break-word;
  word-break: break-all;
`;

const StDeadLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;

  margin-top: 0.8rem;

  ${fontMedium};

  .deadline {
    color: ${({ theme }) => theme.warning};
  }

  .timeover {
    color: ${({ theme }) => theme.sub2};
  }
`;

const StIcon = styled.div`
  ${IconSmall};
`;
