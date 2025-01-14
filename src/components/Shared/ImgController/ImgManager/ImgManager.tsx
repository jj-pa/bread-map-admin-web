import React from 'react';
import { NewBadge, Download, Trash, CheckLine } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type Props = {
  isNew: boolean;
  isSelected: boolean;
  downloadUrl: string;
};

export const ImgManager = ({ isNew, isSelected, downloadUrl }: Props) => {
  return (
    <CheckBoxContainer>
      <Container isSelected={isSelected}>
        <ImgHeader>
          <div>{isNew && <NewBadge />}</div>
          <Buttons>
            <Button>
              <Download />
            </Button>
            <Button>
              <Trash />
            </Button>
          </Buttons>
        </ImgHeader>
        <ImgContainer>
          <img src={downloadUrl || `http://placehold.it/320x300`} alt={'빵'} />
        </ImgContainer>
      </Container>
      {isSelected && (
        <CheckBox>
          <CheckLine />
        </CheckBox>
      )}
    </CheckBoxContainer>
  );
};

const CheckBoxContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 20rem;
  height: 13rem;
`;

const Container = styled.div<{ isSelected: boolean }>`
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  height: 100%;
  border: ${({ isSelected, theme }) => (isSelected ? `4px solid ${theme.color.primary500}` : '4px solid transparent')};
  cursor: pointer;

  > div:first-child {
    > div:nth-child(2) {
      opacity: 0;
      transition: 0.3s;
    }
  }

  &:hover {
    > div:first-child {
      > div:nth-child(2) {
        opacity: 1;
      }
    }
  }
`;

const ImgHeader = styled.div`
  z-index: 2;
  position: absolute;
  left: 0;
  width: 100%;
  top: 4px;
  padding: 0 4px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  position: relative;
  height: inherit;
  width: inherit;

  > img {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const CheckBox = styled.div`
  width: 3rem;
  height: 2.8rem;
  background: ${({ theme }) => theme.color.primary500};
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  width: 2.9rem;
  height: 2.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;
