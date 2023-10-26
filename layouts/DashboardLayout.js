import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='grid min-h-screen grid-rows-header bg-zinc-100'>
      <div>
        <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className='grid md:grid-cols-sidebar'>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className='w-full bg-gray-100 p-4'>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
