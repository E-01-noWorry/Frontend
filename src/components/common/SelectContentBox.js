import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { remainedTime } from '../../shared/timeCalculation';

import { borderBoxDefault } from '../../shared/themes/boxStyle';
import { IconSmall } from '../../shared/themes/iconStyle';
import { fontBold, fontMedium, fontSmall } from '../../shared/themes/textStyle';

import IconPeople from '../../static/icons/Variety=people, Status=untab, Size=S.svg';
import IconLeftTime from '../../static/icons/Variety=Left Time, Status=untab, Size=S.svg';
import IconTimeOver from '../../static/icons/Variety=Timeover, Status=Untab, Size=S.svg';

import styled from 'styled-components';

const SelectContentBox = ({ contents, setRef, filter }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <StContentBoxWrap>
      {contents.length === 0 && (
        <StNoneContents>투표가 없습니다.</StNoneContents>
      )}
      {contents?.map((content, idx) => (
        <StContentBox
          key={content.selectKey}
          onClick={() =>
            navigate(`/detail/${content.selectKey}`, {
              state: { now: state.now, filter },
            })
          }
          //마지막 게시글에 ref를 달아줍니다
          ref={idx === contents.length - 1 ? setRef : null}
          completion={content.completion}
        >
          <StContentHeader>
            <StInnerCategory completion={content.completion}>
              {content.category}
            </StInnerCategory>
            <StInnerNickname>
              작성자 <span>{content.nickname}</span>
            </StInnerNickname>
          </StContentHeader>

          <StInnerTitle completion={content.completion}>
            {content.title}
          </StInnerTitle>

          <StInnerOption completion={content.completion}>
            {content.options?.join(' vs ')}
          </StInnerOption>

          <StContentFooter>
            <StInnerTime>
              {content.completion ? (
                <StIcon>
                  <img src={IconTimeOver} alt="IconTimeOver" />
                </StIcon>
              ) : (
                <>
                  <StIcon>
                    <img src={IconLeftTime} alt="IconLeftTime" />
                  </StIcon>
                  <span>{remainedTime(content.deadLine)}</span>
                </>
              )}
              <span>{content.completion ? '투표마감' : '남음'}</span>
            </StInnerTime>
            <StInnerCurrent>
              <StIcon>
                <img src={IconPeople} alt="IconPeople" />
              </StIcon>
              <span>{content.total || 0}</span>
            </StInnerCurrent>
          </StContentFooter>
        </StContentBox>
      ))}
    </StContentBoxWrap>
  );
};

export default SelectContentBox;

const StNoneContents = styled.div`
  width: 100%;
  margin-top: 4.1rem;

  ${fontMedium}
  text-align: center;
`;

const StContentBoxWrap = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
    padding: 0 2rem 9.6rem 2rem;
    min-height: calc(100% - 12.8rem);
  }

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  margin-top: 12.8rem;
  margin-bottom: 9.6rem;
  background-color: ${({ theme }) => theme.bg};
`;

const StContentBox = styled.div`
  position: relative;

  ${borderBoxDefault};
  align-items: flex-start;
  justify-content: flex-start;

  height: 13.9rem;
  padding: 1.6rem;
  background-color: ${(props) =>
    props.completion ? props.theme.sub4 : props.theme.white};
`;

const StContentHeader = styled.div`
  position: absolute;
  top: 1.6rem;

  display: flex;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
`;

const StInnerCategory = styled.div`
  padding: 0 0.6rem;
  background-color: ${(props) =>
    props.completion ? props.theme.main4 : props.theme.main2};

  border-radius: 1rem;

  ${fontSmall}
  line-height: 2rem;
  color: ${({ theme }) => theme.white};
`;

const StInnerNickname = styled.div`
  ${fontSmall};
  line-height: 2rem;
  color: ${({ theme }) => theme.sub2};

  span {
    ${fontBold};
  }
`;

const StInnerTitle = styled.div`
  width: 100%;
  margin-top: 2.6rem;

  ${fontBold};
  line-height: 2.1rem;
  color: ${(props) =>
    props.completion ? props.theme.sub2 : props.theme.black};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StInnerOption = styled.div`
  width: 100%;
  margin-top: 0.4rem;

  ${fontMedium}
  line-height: 1.8rem;
  color: ${({ theme }) => theme.sub2};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StContentFooter = styled.div`
  position: absolute;
  bottom: 1.6rem;

  display: flex;
  align-items: center;

  width: 100%;
`;

const StIcon = styled.div`
  ${IconSmall};
`;

const StInnerTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  ${fontSmall};
  color: ${({ theme }) => theme.sub2};
`;

const StInnerCurrent = styled.div`
  position: absolute;
  right: 3.6rem;

  display: flex;
  align-items: center;
  gap: 0.4rem;

  ${fontSmall}
  line-height: 2rem;
  color: ${({ theme }) => theme.sub2};
`;
