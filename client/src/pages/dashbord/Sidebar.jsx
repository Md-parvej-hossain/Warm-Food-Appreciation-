import {
  FiHome,
  FiBarChart2,
  FiFileText,
  FiFlag,
  FiUsers,
  FiSettings,
} from 'react-icons/fi';
import { FaBorderAll } from 'react-icons/fa6';
import { FaAddressCard } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import { MdOutlineManageHistory } from 'react-icons/md';
const Sidebar = () => {
  const { user } = useAuth();
  const { role } = useRole();
  return (
    <aside className="flex flex-col items-center w-16 min-h-screen py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
      {/* LOGO */}
      <a href="/" className="mb-8">
        <img src={logo} alt="Logo" className="h-10 object-cover" />
      </a>

      {/* NAV */}
      <nav className="flex flex-col flex-1 space-y-6">
        {role == 'Admin' && (
          <Link to={'/dashboard/addFoods'}>
            <SidebarItem icon={<FaAddressCard />} label="Add Food" />
          </Link>
        )}
        {role == 'Admin' && (
          <Link to={'/dashboard/allFoods'}>
            <SidebarItem icon={<FaBorderAll />} label="All Foods" />
          </Link>
        )}
        {role == 'Admin' && (
          <Link to={'/dashboard/usersData'}>
            <SidebarItem icon={<FiUsers />} label="Users" />
          </Link>
        )}
        {/* <Link to={'/dashboard'}>
          <SidebarItem icon={<FiHome />} label="Home" />
        </Link> */}
        <Link to={'/dashboard'} >
          <SidebarItem icon={<FiBarChart2 />} label="Analytics" />
        </Link>
        {role === 'Rider' && (
          <Link to={'/dashboard/paymentHistory'}>
            <SidebarItem
              icon={<MdOutlineManageHistory />}
              label="Payment History"
            />
          </Link>
        )}

        {role === 'user' && (
          <Link to={'/dashboard/userPaymentHistory'}>
            <SidebarItem
              icon={<MdOutlineManageHistory />}
              label="Payment History"
            />
          </Link>
        )}

        <SidebarItem icon={<FiFileText />} label="Documents" />
        <SidebarItem icon={<FiFlag />} label="Reports" />
      </nav>

      {/* BOTTOM */}
      <div className="flex flex-col space-y-6">
        <SidebarItem icon={<FiSettings />} label="Settings" />
        <Link to={'/dashboard/profail'}>
          <a href="#" className="relative group">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Tooltip */}
            <span className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition">
              Profile
            </span>
          </a>
        </Link>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label }) => {
  return (
    <div className="relative group z-50">
      <a className="p-2 text-gray-700 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 flex items-center justify-center">
        <span className="text-xl">{icon}</span>
      </a>

      {/* Tooltip */}
      <span className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition">
        {label}
      </span>
    </div>
  );
};

export default Sidebar;
