import React, { ChangeEvent, useEffect } from 'react';
import { Button, Input, SelectBox, BasicSelectTrigger, BasicSelectOption } from '@/components/Shared';
import type { SelectOption } from '@/components/Shared';
import useSelectBox from '@/hooks/useSelectBox';
import { SnsLink, Option } from './SnsLinkArea';

type Props = {
  idx: number;
  link: SnsLink;
  opened: boolean;
  options: Option[];
  onToggleLinkOption: (currIdx: number) => void;
  onSelectLinkOption: (payload: { currIdx: number; optionValue: string; linkValue: string }) => void;
  onChangeLinkValue: (payload: { currIdx: number; optionValue: string; linkValue: string }) => void;
  onRemoveLink: (currIdx: number) => void;
};

const SnsLinkItem = ({ idx, link, opened, options, onToggleLinkOption, onSelectLinkOption, onChangeLinkValue, onRemoveLink }: Props) => {
  const { selectedOption, onSelectOption } = useSelectBox();

  const onSelectLink = (option: SelectOption | null) => {
    if (!option) return;
    onSelectOption(option); // UI 업데이트
    onSelectLinkOption({ currIdx: idx, optionValue: option?.value, linkValue: link.value }); // store 상태 업데이트
    // 두개가 다른이유는, 화면에 그릴때의 구조와 보낼때의 구조가 완전 다르기때문이다. 같게할수있는 방법이 있을까?
  };

  const onChangeLink = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedOption?.name) return;
    onChangeLinkValue({ currIdx: idx, optionValue: selectedOption?.value, linkValue: e.target.value });
  };

  useEffect(() => {
    const option = options.find(option => option.value === link.key);
    if (!option) {
      onSelectOption(null);
    } else {
      onSelectOption(option);
    }
  }, [link]);

  return (
    <>
      <SelectBox
        width={130}
        isOpen={opened}
        onToggleSelectBox={() => onToggleLinkOption(idx)}
        triggerComponent={<BasicSelectTrigger selectedOption={selectedOption} />}
      >
        {options.map((option, idx) => (
          <BasicSelectOption key={idx} option={option} onSelectOption={onSelectLink} />
        ))}
      </SelectBox>
      <Input type={'plain'} onChangeInput={e => onChangeLink(e)} value={link.value} />
      <Button type={'gray'} text={'삭제'} btnSize={'small'} onClickBtn={() => onRemoveLink(idx)} />
    </>
  );
};

export default SnsLinkItem;
