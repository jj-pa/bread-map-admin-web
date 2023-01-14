import React from 'react';
import { Input } from '@/components/Shared/Input';
import { BakeryFormChangeKey } from '@/store/slices/bakery';
import { Row, RowContents } from '@/styles';

type Props = {
  label: string;
  textarea?: boolean;
  placeholder?: string;
  name: BakeryFormChangeKey;
  value: string;
  onChangeForm: (payload: { name: BakeryFormChangeKey; value: never }) => void;
};

// type 입력받기. input or textarea
// 시간에 대한 정보는 Textarea로 변경해야함
export const BasicForm = ({ label, textarea = false, placeholder, name, value, onChangeForm }: Props) => {
  return (
    <Row>
      <label>{label}</label>
      <RowContents>
        <Input
          name={name}
          type={'plain'}
          placeholder={placeholder || ''}
          textarea={textarea}
          value={value}
          onChangeInput={e => onChangeForm({ name, value: e.target.value as never })}
        />
      </RowContents>
    </Row>
  );
};