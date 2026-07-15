import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;