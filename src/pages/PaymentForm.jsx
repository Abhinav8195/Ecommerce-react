import React, { useState, useEffect } from 'react';
import { addDoc, collection ,deleteDoc,query,getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { toast,ToastContainer } from 'react-toastify';

const PaymentForm = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone,setPhone]=useState('');
  const [track,settrack]=useState('Order has been placed and soon will be picked up')
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);
  const navigate = useNavigate();
  const { user } = UserAuth();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    let totalPrice = 0;
    storedCartItems.forEach((item) => {
      totalPrice += +item.price* item.quantity;
    });
    setTotalPrice(totalPrice);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert('User not authenticated');
      return;
    }

    // Validation checks for required fields

    // Prepare order data
    const orderData = {
      uid: user.uid,
      email,
      address,
      city,
      stateProvince,
      postalCode,
      billingSameAsShipping,
      totalPrice,
      cartItems,
      phone,
      track,
      createdAt: new Date().toISOString(),
    };

    // Open Razorpay modal for payment
    const options = {
      key: process.env.REACT_APP_RAZOR_KEY,
      amount: totalPrice * 100, 
      currency: 'INR',
      name: 'E-Bharat',
      description: 'Payment for order',
      image: 'https://your-website.com/logo.png',
      handler: function (response) {
        // Payment success callback
        toast.success('Payment Successful');
        orderData.paymentId = response.razorpay_payment_id;

        // Save order data to Firestore
        saveOrderToFirestore(orderData);
      },
      prefill: {
        email: email,
        contact: phone,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const saveOrderToFirestore = async (orderData) => {
    try {
      await addDoc(collection(db, 'orders'), orderData);
      clearLocalStorageAndFirebaseCart(user);
      navigate('/');
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('Failed to save order. Please try again.');
    }
  };

  const clearLocalStorageAndFirebaseCart = async (user) => {
    console.log(user.uid); 
    try {
      localStorage.removeItem('cartItems');
      setCartItems([]);
      const userCartItemsRef = collection(db, `carts/${user.uid}/items`);
      const q = query(userCartItemsRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      console.log('Cart deleted successfully for user:', user.uid);
    } catch (error) {
      console.error('Error clearing local storage and Firebase cart:', error);
      throw new Error('Error clearing local storage and Firebase cart');
    }
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">Your Order</div>
          <div className="text-blue-500 cursor-pointer">Show full summary</div>
        </div>
        <div className="border-t border-b py-2 mb-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium">Total</div>
            <div className="text-lg font-medium">₹ {totalPrice.toFixed(2)}</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            className="w-full mb-4 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full mb-4 p-2 border rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className="w-full mb-4 p-2 border rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State / Province"
            className="w-full mb-4 p-2 border rounded"
            value={stateProvince}
            onChange={(e) => setStateProvince(e.target.value)}
          />
          <input
            type="text"
            placeholder="Postal code"
            className="w-full mb-4 p-2 border rounded"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            className="w-full mb-4 p-2 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={billingSameAsShipping}
              onChange={(e) => setBillingSameAsShipping(e.target.checked)}
            />
            <span>Billing address is the same as shipping address</span>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
            Pay ₹{totalPrice.toFixed(2)}
          </button>
          
        </form>
        <div className="text-center text-gray-500 text-sm mt-4">
          <span role="img" aria-label="lock">🔒</span> Payment details stored in plain text
        </div>
      </div>
    </div>
      <ToastContainer/>
    </>
  );
};

export default PaymentForm;
