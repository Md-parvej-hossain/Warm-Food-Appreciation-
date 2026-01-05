import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { IoIosArrowDown } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import Profile from './Profile';
import BecomeARiderModal from '../../components/modal/BecomeaRiderModal';
import useAuth from '../../hooks/useAuth';
import CartDrawer from '../../pages/CartDrawer/CartDrawer';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { user } = useAuth();
  const [value, setValue] = useState('');

  const handleGetData = data => {
    setValue(data);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeNavLink = ({ isActive }) =>
    `relative transition-all duration-300
   ${
     isActive
       ? 'text-[#00FFFF] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#00FFFF]'
       : 'hover:text-yellow-300'
   }`;
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16
        ${
          isScrolled
            ? 'bg-[#4a3c35]/80 backdrop-blur-sm shadow-lg'
            : 'bg-transparent'
        }
      `}
    >
      <div className="fixed top-0 left-0 w-full z-50  backdrop-blur-md border-b border-gray-600/30">
        <div className="w-full md:w-full mx-auto px-4 py-3 flex items-center justify-between text-white">
          {/* Logo */}
          <NavLink
            to={'/'}
            className="flex items-center text-sm md:text-xl font-semibold"
          >
            <img src={logo} alt="logo" className="w-15 md:20 object-cover" />
            <span>Warm Food</span>
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-sm">
            <li>
              <NavLink to="/" className={activeNavLink}>
                Home
              </NavLink>
            </li>

            {/* Restaurants */}
            <li>
              <NavLink to="/allRestaurants" className={activeNavLink}>
                All Restaurants
              </NavLink>
            </li>
            {/* become a rider modal  */}
            <BecomeARiderModal isOpen={isOpen} closeModal={closeModal} />
            {/* Categories */}
            <li className="dropdown dropdown-hover">
              <label
                tabIndex={0}
                className="cursor-pointer hover:text-yellow-300 flex items-center gap-1"
              >
                Categories <IoIosArrowDown />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-[#2a1f1b] text-white rounded-box w-44"
              >
                <li>
                  <NavLink to="/category/pizza">Pizza</NavLink>
                </li>
                <li>
                  <NavLink to="/category/burger">Burger</NavLink>
                </li>
                <li>
                  <NavLink to="/category/biryani">Biryani</NavLink>
                </li>
                <li>
                  <NavLink to="/category/chinese">Chinese</NavLink>
                </li>
                <li>
                  <NavLink to="/category/desserts">Desserts</NavLink>
                </li>
                <li>
                  <NavLink to="/category/friedChicken">Fried Chicken</NavLink>
                </li>
                <li>
                  <NavLink to="/category/drinks">Drinks</NavLink>
                </li>
                <li>
                  <NavLink to="/category/pasta">Pasta</NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to="/offerPages"
                className={`hover:text-yellow-300 ${activeNavLink}`}
              >
                Offers
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/trackOrder"
                  className={`hover:text-yellow-300 ${activeNavLink}`}
                >
                  Track Order
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink
                  onClick={() => setIsOpen(true)}
                  className="hover:text-yellow-300"
                >
                  Become a Rider
                </NavLink>
              </li>
            )}

            <li>
              {user ? (
                ''
              ) : (
                <NavLink to="/login" className={activeNavLink}>
                  Login / Register
                </NavLink>
              )}
            </li>

            {/* Cart */}
            <li>
              <NavLink
                onClick={() => setOpenCart(true)}
                className="relative hover:text-yellow-300"
              >
                <FaShoppingCart size={18} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {value}
                </span>
              </NavLink>
            </li>
          </ul>

          <CartDrawer
            isOpen={openCart}
            handleGetData={handleGetData}
            onClose={() => setOpenCart(false)}
          />

          <div className="flex items-center gap-2">
            {user ? (
              <Profile />
            ) : (
              <NavLink to="/login" title="Login Please">
                <Profile />
              </NavLink>
            )}

            {/* Hamburger Button for Mobile */}
            <button
              className="md:hidden text-3xl"
              onClick={() => setOpen(!open)}
            >
              {open ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all  duration-300 overflow-hidden bg-[#4a3c35]/95 backdrop-blur-xl ${
            open ? `max-h-125 py-4` : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col gap-3 px-6 text-white">
            <li>
              <NavLink to="/" onClick={() => setOpen(false)}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/allRestaurants" className={activeNavLink}>
                All Restaurants
              </NavLink>
            </li>

            <li>
              <details>
                <summary className="cursor-pointer py-2">Categories</summary>
                <ul className="pl-4 space-y-2">
                  <li>
                    <NavLink to="/category/pizza">Pizza</NavLink>
                  </li>
                  <li>
                    <NavLink to="/category/burger">Burger</NavLink>
                  </li>
                  <li>
                    <NavLink to="/category/biryani">Biryani</NavLink>
                  </li>
                  <li>
                    <NavLink to="/category/chinese">Chinese</NavLink>
                  </li>
                  <li>
                    <NavLink to="/category/desserts">Desserts</NavLink>
                  </li>
                  <li>
                    <NavLink to="/category/friedChicken">Fried Chicken</NavLink>
                  </li>
                  <li>
                    <NavLink to="/category/drinks">Drinks</NavLink>
                  </li>
                  <li>
                    <NavLink to="/category/pasta">Pasta</NavLink>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <NavLink
                to="/offerPages"
                className={`hover:text-yellow-300 ${activeNavLink}`}
              >
                Offers
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/trackOrder"
                  className={`hover:text-yellow-300 ${activeNavLink}`}
                >
                  Track Order
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink
                  onClick={() => setIsOpen(true)}
                  className="hover:text-yellow-300"
                >
                  Become a Rider
                </NavLink>
              </li>
            )}

            <li>
              {user ? (
                ''
              ) : (
                <NavLink to="/login" className={activeNavLink}>
                  Login / Register
                </NavLink>
              )}
            </li>

            {/* Cart */}
            <li>
              <NavLink
                onClick={() => setOpenCart(true)}
                className="relative hover:text-yellow-300"
              >
                <FaShoppingCart size={18} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {value}
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
