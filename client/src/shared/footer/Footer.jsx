import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import '../footer/Footer';
import { Link } from 'react-router';
const Footer = () => {
  return (
    <footer className="bg-[#2a1f1b] text-gray-300 pt-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="logo" className="w-20 object-cover" />
            <h2 className="text-xl font-semibold text-white">Warm Food</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Warm Food delivers your favorite meals fast, fresh, and right to
            your doorstep. Experience comfort food like never before.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a className="footer-icon" href="#">
              <FaFacebookF />
            </a>
            <a className="footer-icon" href="#">
              <FaYoutube />
            </a>
            <a className="footer-icon" href="#">
              <FaInstagram />
            </a>
            <a className="footer-icon" href="#">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="footer-title">Company</h3>
          <ul className="footer-links">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/restaurants">Restaurants</Link>
            </li>
            <li>
              <Link to="/offers">Offers</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* For Customers */}
        <div>
          <h3 className="footer-title">For Customers</h3>
          <ul className="footer-links">
            <li>
              <Link to="/track-order">Track Order</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* For Riders */}
        <div>
          <h3 className="footer-title">For Riders</h3>
          <ul className="footer-links">
            <li>
              <Link to="/become-rider">Become a Rider</Link>
            </li>
            <li>
              <Link to="/rider-login">Rider Login</Link>
            </li>
            <li>
              <Link to="/rider-support">Rider Support</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-12 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Warm Food. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
