import React from 'react';
import { Outlet } from 'react-router-dom';
import { useMenu } from '@/apis';
import styled from '@emotion/styled';
import { SideBar } from './SideBar';

export const Layout = () => {
  const {
    menuCountQuery: { data: menuCount },
  } = useMenu();

  return (
    <Container>
      <aside>
        <SideBar menuCount={menuCount} />
      </aside>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;

  > aside {
    z-index: 3;
    background: ${({ theme }) => theme.color.white};
    width: ${({ theme }) => theme.size.sidebarWidth};
    border-right: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  }

  main {
    flex: 1;
    max-width: ${({ theme }) => `calc(100vw - ${theme.size.sidebarWidth}`};
  }
`;
