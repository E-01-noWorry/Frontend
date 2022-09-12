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

  if (contents.length === 0) {
    return <StNoneContents>게시글이 없습니다.</StNoneContents>;
  }

  return (
    <StContentBoxWrap>
      {contents?.map((content, idx) => (
        <StContentBox
          key={content.selectKey}
          onClick={() => navigate(`/detail/${content.selectKey}`)}
          //마지막 게시글에 ref를 달아줍니다
          ref={idx === contents.length - 1 ? setRef : null}
          completion={content.completion}
        >
          <StContentHeader>
            <StInnerCategory>{content.category}</StInnerCategory>
            <StInnerNickname>
              작성자 <span>{content.nickname}</span>
            </StInnerNickname>
          </StContentHeader>

          <StInnerTitle completion={content.completion}>
            {content.title}
          </StInnerTitle>

          <StInnerOption>
            {/* 선택지 내용이 길면 26글자에서 잘라줍니다 */}
            {content.options?.join(' vs ').length > 26
              ? content.options?.join(' vs ').slice(0, 26) + '...'
              : content.options?.join(' vs ')}
          </StInnerOption>

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

const StNoneContents = styled.div`
  width: 100%;
  margin-top: 15.4rem;

  ${fontMedium}
  text-align: center;
`;

const StContentBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  margin-top: 13rem;
  margin-bottom: 8.4rem;
`;

const StContentBox = styled.div`
  ${borderBoxDefault};
  align-items: flex-start;

  height: 100%;
  padding: 1.6rem;
  background-color: ${(props) => (props.completion ? '#F4F3F0' : '#fff')};

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);

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
  color: ${(props) => (props.completion ? '#767676' : '#000')};
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
