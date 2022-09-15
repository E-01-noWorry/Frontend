import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import instance from '../app/module/instance';
import { cleanUp, __getDetailSelect } from '../app/module/selectSlice';

import Header from '../components/common/Header';
import BodyPadding from '../components/common/BodyPadding';
import Vote from '../components/features/vote/Vote';
import Comment from '../components/features/comment/comment';
import ProfileImg from '../components/elements/ProfileImg';
import { ModalDelete } from '../components/common/Modal';

import { remainedTime } from '../shared/timeCalculation';

import {
  fontExtraBold,
  fontLarge,
  fontMedium,
} from '../shared/themes/textStyle';
import { IconLarge, IconSmall } from '../shared/themes/iconStyle';

import IconBack from '../static/icons/Variety=back, Status=untab.svg';
import IconDelete from '../static/icons/Variety=delete, Status=untab.svg';
import IconTimer from '../static/icons/Variety=timer, Status=untab.svg';
import IconTimeOver from '../static/icons/Variety=timeover, Status=untab.svg';

import styled from 'styled-components';

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const content = useSelector((state) => state.select.select);
  const user = useSelector((state) => state);

  const { selectKey } = useParams();
  const userKey = localStorage.getItem('userKey');

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(__getDetailSelect(selectKey));

    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch, selectKey]);

  //투표 게시글 DELETE API
  const deleteHandler = async () => {
    try {
      await instance.delete(`/select/${selectKey}`);
      navigate('/main', { state: 'select' });
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  };

  return (
    <>
      {deleteModal && (
        <ModalDelete setter={() => setDeleteModal(false)} del={deleteHandler} />
      )}

      <Header>
        <StHeaderIcon onClick={() => navigate(-1)}>
          <img src={IconBack} alt="IconBack" />
        </StHeaderIcon>
        {parseInt(userKey) === content?.userKey && (
          <StHeaderIcon onClick={() => setDeleteModal(true)}>
            <img src={IconDelete} alt="IconDelete" />
          </StHeaderIcon>
        )}
      </Header>

      <BodyPadding>
        <StInfoWrap>
          <ProfileImg />

          <StNickname>{content.nickname}</StNickname>

          <StCategory>{content.category}</StCategory>

          <StTitle>{content.title}</StTitle>

          <StDeadLine>
            {content.completion ? (
              <>
                <StIcon>
                  <img src={IconTimeOver} alt="IconTimeOver" />
                </StIcon>
                <span>투표마감</span>
              </>
            ) : (
              <>
                <StIcon>
                  <img src={IconTimer} alt="IconTimer" />
                </StIcon>
                <span>{remainedTime(content.deadLine)}</span>
              </>
            )}
          </StDeadLine>
        </StInfoWrap>

        <Vote content={content} selectKey={selectKey} />
      </BodyPadding>

      <Comment content={content} user={user} />
    </>
  );
};

export default Detail;

const StHeaderIcon = styled.div`
  ${IconLarge};
`;

const StInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 6.4rem;
`;

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
`;

const StDeadLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;

  margin-top: 0.8rem;

  ${fontMedium};

  span:nth-child(2) {
    color: ${({ theme }) => theme.warning};
  }
`;

const StIcon = styled.div`
  ${IconSmall};
`;
