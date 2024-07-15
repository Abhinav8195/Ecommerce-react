import React from 'react';
import { Link } from 'react-router-dom';
import { FaOpencart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-gradient-to-b from-black to-gray-600 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-green-500 text-3xl font-bold">
          <Link to={'/'}>Abhinav's Store</Link>
        </div>
        <div>
          <SearchBar />
        </div>
        <div className="flex items-center">
          <Link to={'/cart'} className="mr-4">
          
            <CartIcon/>
           
          </Link>
          {user?.email ? (
            <div>
              <Link to={'/userDashboard'}>
                <span className="text-white text-sm font-semibold mx-2">{user?.displayName}</span>
              </Link>
              <Link to={''} className="text-white text-lg font-semibold mx-2">
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
    </nav>
  );
};

export default Navbar;
