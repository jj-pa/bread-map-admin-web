import React from 'react';
import styled from '@emotion/styled';
import { Button, ReadOnlyInputField } from '@/components/Shared';
import hamburger from '/images/hamburger.png';

export const InfoEditRequestCard = () => {
  return (
    <Container>
      <span className="date">2023.12.12 12:12</span>
      <div className="card">
        <div className="menu_info">
          <div className="input_area">
            <div className="max-w-230">
              <ReadOnlyInputField label={'제보자'} content={'빵으로 미친자'} labelMinWidth={6} />
            </div>
            <ReadOnlyInputField label={'수정 사항'} type={'textarea'} multiLine content={'바게트빵 가격이 6,800원으로 변경되었어요!'} labelMinWidth={6} />
          </div>
        </div>
      </div>
      <div className="bottom_wrapper">
        <div className="img_wrapper">
          {Array(5)
            .fill(0)
            .map((item, idx) => (
              <div className="img_item">
                <img src={hamburger} alt="빠앙" />
              </div>
            ))}
        </div>
        <div className="btn_wrapper">
          <Button type={'white'} text={'삭제하기'} btnSize={'small'} />
          <Button type={'orange'} text={'변경 완료'} btnSize={'small'} />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .date {
    font-size: 1.6rem;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .card {
    display: flex;
  }

  .menu_info {
    flex: 1;
  }

  .input_area {
    > div {
      margin-bottom: 5px;
    }

    .max-w-230 {
      max-width: 230px;
    }

    .input_wrapper {
      display: flex;
      gap: 2rem;

      > img {
        width: 100%;
        min-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .bottom_wrapper {
    display: flex;
    justify-content: space-between;
    padding-left: 5.85rem;

    .img_wrapper {
      display: flex;
      justify-content: flex-start;

      .img_item {
        display: flex;
        justify-content: center;
        align-items: center;
        object-fit: cover;
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.color.gray200};
        overflow: hidden;

        > img {
          width: 100%;
          min-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .btn_wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: baseline;
      gap: 5px;
    }
  }
`;
