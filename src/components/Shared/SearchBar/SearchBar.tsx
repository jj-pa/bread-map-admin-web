import React from 'react';
import { Input } from '@/components/Shared';
import { Search } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type Props = {
  placeholder: string;
  text: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
};

export const SearchBar = ({ placeholder, text, onChangeText, onSearch }: Props) => {
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Container>
      <Input
        value={text}
        onChangeInput={e => onChangeText(e.target.value)}
        onKeypressInput={onEnter}
        placeholder={placeholder}
        type={'plain'}
        padding={'large'}
      />
      <button>
        <Search onClick={onSearch} />
      </button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  button {
    position: absolute;
    top: 43%;
    right: 22px;
    transform: scale(0.7) translateY(-50%);
  }
`;
