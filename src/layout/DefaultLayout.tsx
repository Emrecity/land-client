import React, { useState, ReactNode} from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { Outlet} from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

const DefaultLayout: React.FC<{ children: ReactNode }> = () => {
  // const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark max-h-screen overflow-y-hidden">
      <div className="flex h-screen overflow-y-hidden">
        <div className='h-screen overflow-y-hidden'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="relative flex flex-1 flex-col overflow-y-scroll overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 ">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
