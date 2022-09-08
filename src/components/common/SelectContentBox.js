import React from 'react';
import { useNavigate } from 'react-router-dom';

import { remainedTime } from '../../shared/timeCalculation';

import { borderBoxDefault } from '../../shared/themes/boxStyle';
import { IconSmall } from '../../shared/themes/iconStyle';
import { fontBold, fontMedium, fontSmall } from '../../shared/themes/textStyle';

import IconPeople from '../../static/icons/Variety=people, Status=untab.svg';

import styled from 'styled-components';

const SelectContentBox = ({ contents, setRef }) => {
  const navigate = useNavigate();

  return (
    <StContentBoxWrap>
      {contents?.map((content, idx) => (
        <StContentBox
          key={content.selectKey}
          onClick={() => navigate(`/detail/${content.selectKey}`)}
          //마지막 게시글에 ref를 달아준다
          ref={idx === contents.length - 1 ? setRef : null}
        >
          <StContentHeader>
            <StInnerCategory>{content.category}</StInnerCategory>
            <StInnerNickname>
              작성자 <span>{content.nickname}</span>
            </StInnerNickname>
          </StContentHeader>

          <StInnerTitle>{content.title}</StInnerTitle>

          <StInnerOption>{content.options?.join(' vs ')}</StInnerOption>

          <StContentFooter>
            <StInnerCurrent>
              <StIcon>
                <img src={IconPeople} />
              </StIcon>
              <span>{content.total || 0}</span>
            </StInnerCurrent>
            <StInnerTime>
              <span>{content.completion ? '투표마감' : '남은시간'}</span>
              <span>{remainedTime(content.deadLine)}</span>
            </StInnerTime>
          </StContentFooter>
        </StContentBox>
      ))}
    </StContentBoxWrap>
  );
};

export default SelectContentBox;

const StContentBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const StContentBox = styled.div`
  ${borderBoxDefault};
  align-items: flex-start;

  height: 100%;
  padding: 1.6rem;
  background-color: #fff;

  &:hover,
  &:active {
    background-color: #d4d4d4;
  }
`;

const StContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
`;

const StContentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 3.2rem;
`;

const StInnerCategory = styled.div`
  height: 2rem;
  padding: 0 0.5rem;
  background-color: #ececec;

  border-radius: 1rem;

  ${fontSmall}
  line-height: 1.95rem;
`;

const StInnerCurrent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  ${fontSmall}
  line-height: 2rem;
`;

const StIcon = styled.div`
  ${IconSmall};
`;

const StInnerTitle = styled.div`
  margin-top: 1rem;

  ${fontBold};
  line-height: 2.1rem;
`;

const StInnerOption = styled.div`
  margin-top: 0.6rem;

  ${fontMedium}
  line-height: 1.8rem;
`;

const StInnerNickname = styled.div`
  ${fontSmall};
  line-height: 2rem;

  span {
    ${fontBold};
  }
`;

const StInnerTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  ${fontSmall};
`;
