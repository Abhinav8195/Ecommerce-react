import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaOpencart } from 'react-icons/fa'; 
import { UserAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const CartIcon = () => {
  const [Cartl, setCartL] = useState(0);
  const { user } = UserAuth();
  
  useEffect(() => {
    const fetchCartItemsFromLocalStorage = () => {
      const cartItems = localStorage.getItem('cartItems');
      console.log('abc',cartItems)
      if (cartItems) {
        const parsedCartItems = JSON.parse(cartItems);
        setCartL(parsedCartItems.length); 
      }
    };

    fetchCartItemsFromLocalStorage();

  }, []);
  
  return (
    <div className="flex items-center relative">
      <Link to={'/cart'} className="mr-4">
        <FaOpencart size={30} color="white" />
        {user?.email && Cartl > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center rounded-full bg-purple-50 px-2 py-1 text-xs font-bold text-purple-700 transform translate-x-1/2 -translate-y-1/2">
            {Cartl}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartIcon;
