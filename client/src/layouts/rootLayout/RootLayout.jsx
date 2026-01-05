import Footer from '../../shared/footer/Footer.jsx';
import { Outlet } from 'react-router';

import Navbar from '../../shared/navbar/Navbar';
const RootLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="min-h-[calc(100vh-441px)] w-full mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
