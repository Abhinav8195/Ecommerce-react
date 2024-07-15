import React from 'react';
import { Link } from 'react-router-dom';
import { FaOpencart, FaBars, FaTimes } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-b from-black to-gray-600 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-green-500 text-3xl font-bold">
          <Link to={'/'}>Abhinav's Store</Link>
        </div>
        <div className="flex items-center">
          <SearchBar /> {/* Always show SearchBar */}
          <Link to={'/cart'} className="ml-4">
            <CartIcon /> {/* Always show Cart icon */}
          </Link>
        </div>
        <div className="hidden lg:flex items-center">
          <div className="flex items-center ml-4">
            {user?.email ? (
              <div className="flex items-center">
                <Link to={'/userDashboard'} className="text-white text-sm font-semibold mx-2">
                  {user?.displayName}
                </Link>
                <Link to={'/wishlist'} className="text-white text-lg font-semibold mx-2">
                  Wishlist
                </Link>
                {user.email === 'abhianvbhatia143@gmail.com' && (
                  <Link to={'/adminDashboard'} className="text-white text-lg font-semibold mx-2">
                    Admin
                  </Link>
                )}
                <button className="text-white text-lg font-semibold mx-2" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link to={'/register'} className="text-white text-lg font-semibold mx-2">
                  Register
                </Link>
                <Link to={'/login'} className="text-white text-lg font-semibold mx-2">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-2">
          <div className="flex flex-col items-center">
            {user?.email ? (
              <div className="mt-4 text-center">
                <Link to={'/userDashboard'} className="block py-2 text-white">
                  <span className="text-sm font-semibold">{user?.displayName}</span>
                </Link>
                <Link to={'/wishlist'} className="block py-2 text-white">
                  Wishlist
                </Link>
                {user.email === 'abhianvbhatia143@gmail.com' && (
                  <Link to={'/adminDashboard'} className="block py-2 text-white">
                    Admin
                  </Link>
                )}
                <Link className="block py-2 text-white" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            ) : (
              <div className="mt-4 text-center">
                <Link to={'/register'} className="block py-2 text-white">
                  Register
                </Link>
                <Link to={'/login'} className="block py-2 text-white">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {/* End Mobile Menu */}
    </nav>
  );
};

export default Navbar;
