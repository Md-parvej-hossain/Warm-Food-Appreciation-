import { Outlet } from 'react-router';
import Sidebar from '../../pages/dashbord/SideBar';

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen flex bg-white">
      {/* Left Side: Sidebar Component */}
      <div className="">
        <Sidebar />
      </div>

      {/* Right Side: Dashboard Dynamic Content */}
      <div className="w-full h-screen overflow-auto ">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
