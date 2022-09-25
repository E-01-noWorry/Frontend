import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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

import IconBack from '../static/icons/Variety=back, Status=untab, Size=L.svg';
import IconDelete from '../static/icons/Variety=delete, Status=untab, Size=L.svg';
import IconTimeWarning from '../static/icons/Variety=Time warning, Status=untab, Size=S.svg';
import IconTimeOver from '../static/icons/Variety=Timeover, Status=Untab, Size=S.svg';

import styled from 'styled-components';

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const content = useSelector((state) => state.select.select);
  const user = useSelector((state) => state);

  const { selectKey } = useParams();
  const userKey = localStorage.getItem('userKey');

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(__getDetailSelect(selectKey));

    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch, selectKey]);

  //투표 게시글 DELETE API
  const deleteHandler = async () => {
    try {
      await instance.delete(`/select/${selectKey}`);
      if (state?.now === 'select' || state?.now === false) {
        navigate('/main', { state: { now: 'select' } });
      } else {
        navigate(-1);
      }
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
        <StHeaderIcon
          onClick={() => {
            state?.now === 'select' || state?.now === false
              ? navigate('/main', {
                  state: { now: 'select', filter: state.filter },
                })
              : navigate(-1);
          }}
        >
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
                <span className="deadline">
                  {remainedTime(content.deadLine)}
                </span>
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
