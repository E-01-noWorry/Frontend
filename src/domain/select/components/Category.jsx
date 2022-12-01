import React from "react";
import { useDispatch } from "react-redux";
import { changeSelected } from "app/module/selectSlice";

import useDropdown from "domain/select/hooks/useDropdown";
import { CATEGORY_ARR, FILTER_ARR } from "shared/utils/arr";
import { fontMedium } from "shared/themes/textStyle";

import { ReactComponent as IconDropdown } from "static/icons/Variety=Dropdown, Status=untab, Size=S.svg";
import styled from "styled-components";

const Category = ({ filter, category, proceeding, length, refreshPage }) => {
  const dispatch = useDispatch();

  const [isOpenFilter, dropFilterRef, handleClickFilter] = useDropdown();
  const [isOpenCategory, dropCategoryRef, handleClickCategory] = useDropdown();
  const [isOpenProceeding, dropProceedingRef, handleClickProceeding] = useDropdown();

  const handleClickSelected = (value, item) => {
    refreshPage();
    dispatch(changeSelected({ value, item }));
  };

  return (
    <S.Container length={length}>
      <S.Menu onClick={handleClickFilter} ref={dropFilterRef}>
        <span>{filter}</span>
        <IconDropdown />
        <S.Down isOpen={isOpenFilter}>
          {FILTER_ARR.map((item) => (
            <span key={item} onClick={() => handleClickSelected("filter", item)}>
              {item}
            </span>
          ))}
        </S.Down>
      </S.Menu>

      <S.Menu onClick={handleClickCategory} ref={dropCategoryRef}>
        <span>{category}</span>
        <IconDropdown />
        <S.Down isOpen={isOpenCategory}>
          {CATEGORY_ARR.map((item) => (
            <span key={item} onClick={() => handleClickSelected("category", item)}>
              {item}
            </span>
          ))}
        </S.Down>
      </S.Menu>

      <S.Menu onClick={handleClickProceeding} ref={dropProceedingRef}>
        <span>{proceeding}</span>
        <IconDropdown />
        <S.Down isOpen={isOpenProceeding}>
          {["모든 투표", "진행중인 투표"].map((item) => (
            <span key={item} onClick={() => handleClickSelected("proceeding", item)}>
              {item}
            </span>
          ))}
        </S.Down>
      </S.Menu>
    </S.Container>
  );
};

const S = {
  Container: styled.section`
    @media ${({ theme }) => theme.device.PC} {
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    position: fixed;
    top: 12.8rem;

    display: flex;
    align-items: flex-start;
    gap: 2.5rem;

    width: 100%;
    height: 4.2rem;
    padding: 0.4rem 2rem 0 2rem;
    background-color: ${({ theme }) => theme.bg};

    border-bottom: ${(props) => (props.length ? null : `1px solid ${props.theme.sub4}`)};

    z-index: 9;
  `,

  Menu: styled.article`
    display: flex;
    align-items: center;

    cursor: pointer;

    span {
      ${fontMedium};
      color: ${({ theme }) => theme.sub2};
    }
  `,

  Down: styled.div`
    @media ${({ theme }) => theme.device.PC} {
      top: 3rem;
    }

    position: fixed;
    top: 16rem;

    display: flex;
    flex-direction: column;

    background-color: #fff;

    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
    border-radius: 1rem;

    transform-origin: center top;
    transition-duration: 0.1s;
    transform: scaleY(${(props) => (props.isOpen ? 1 : 0)});

    span {
      display: block;

      height: 3rem;
      padding: 0 1.5rem;

      line-height: 3rem;

      &:hover,
      &:active {
        color: ${({ theme }) => theme.main2};
      }
    }
  `,
};

export default Category;
