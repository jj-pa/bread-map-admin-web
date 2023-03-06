import React from 'react';
import { ReportContentSection } from '@/components/BakeryDetail/Report/ReportContentSection';
import { Tab, TabItem } from '@/components/Shared';
import { BAKERY_REPORT_TAB, BakeryReportTabValue } from '@/constants';
import { Divider } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  tabs: typeof BAKERY_REPORT_TAB;
  handleSelectReportTab: (tab: TabItem) => void;
};

export const ReportTab = ({ tabs, handleSelectReportTab }: Props) => {
  return (
    <Container>
      {tabs.map(item => (
        <Tab key={`report-tab-${item.value}`} tab={item} type={'outline'} onSelectReportTab={handleSelectReportTab} />
      ))}
      <Divider />
      <ReportContentSection type={tabs.find(i => i.isActive)?.value as BakeryReportTabValue} />
    </Container>
  );
};

const Container = styled.div`
  padding: 0 2rem;
`;
