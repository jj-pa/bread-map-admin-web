import React from 'react';
import { Report } from '@/components/BakeryDetail/Report/Report';
import { Tab, TabItem } from '@/components/Shared';
import { BAKERY_REPORT_TAB } from '@/constants';
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
      <Report tabItem={tabs.find(i => i.isActive) as TabItem} />
    </Container>
  );
};

const Container = styled.div``;
