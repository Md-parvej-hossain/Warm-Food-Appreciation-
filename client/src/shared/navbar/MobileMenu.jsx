import React, { useState } from 'react';
import { NavLink } from 'react-router';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`md:hidden transition-all duration-300 overflow-hidden bg-[#4a3c35]/95 backdrop-blur-xl ${
        open ? 'max-h-[500px] py-4' : 'max-h-0'
      }`}
    >
      <ul className="flex flex-col gap-3 px-6 text-white">
        <li>
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
        </li>

        <li>
          <details>
            <summary className="cursor-pointer py-2">Restaurants</summary>
            <ul className="pl-4 space-y-2">
              <li>
                <NavLink to="/restaurants" onClick={() => setOpen(false)}>
                  All Restaurants
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/restaurants/nearby"
                  onClick={() => setOpen(false)}
                >
                  Nearby
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/restaurants/top-rated"
                  onClick={() => setOpen(false)}
                >
                  Top Rated
                </NavLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <details>
            <summary className="cursor-pointer py-2">Categories</summary>
            <ul className="pl-4 space-y-2">
              <li>
                <NavLink to="/category/pizza" onClick={() => setOpen(false)}>
                  Pizza
                </NavLink>
              </li>
              <li>
                <NavLink to="/category/burgers" onClick={() => setOpen(false)}>
                  Burgers
                </NavLink>
              </li>
              <li>
                <NavLink to="/category/biryani" onClick={() => setOpen(false)}>
                  Biryani
                </NavLink>
              </li>
              <li>
                <NavLink to="/category/chinese" onClick={() => setOpen(false)}>
                  Chinese
                </NavLink>
              </li>
              <li>
                <NavLink to="/category/desserts" onClick={() => setOpen(false)}>
                  Desserts
                </NavLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <NavLink to="/offers" onClick={() => setOpen(false)}>
            Offers
          </NavLink>
        </li>
        <li>
          <NavLink to="/track-order" onClick={() => setOpen(false)}>
            Track Order
          </NavLink>
        </li>
        <li>
          <NavLink to="/become-rider" onClick={() => setOpen(false)}>
            Become a Rider
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" onClick={() => setOpen(false)}>
            Login / Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" onClick={() => setOpen(false)}>
            Cart
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
