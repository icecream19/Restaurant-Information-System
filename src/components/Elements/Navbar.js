import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Links to different pages */}
      <ul>
        <li>
          <a href="/" className="hover:text-gray-300">
            Homepage
          </a>
        </li>
        <li>
          <a href="/checkout" className="hover:text-gray-300">
            Checkout
          </a>
        </li>
        <li>
          <a href="/manage" className="hover:text-gray-300">
            Manage
          </a>
        </li>
        <li>
          <a href="/order" className="hover:text-gray-300">
            Order
          </a>
        </li>
        <li>
          <a href="/orderstatus" className="hover:text-gray-300">
            Order Status
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

