import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';

const ReturnOrderForm = () => {
  const [order, setOrder] = useState(null);
  const [productName, setProductName] = useState('');
  const [reason, setReason] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = doc(db, 'orders', id);
        const orderSnapshot = await getDoc(orderDoc);
        
        if (orderSnapshot.exists()) {
          const orderData = orderSnapshot.data();
          setOrder(orderData);
          setContactEmail(orderData.email); 
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!order) {
      console.error('No order data to submit');
      return;
    }

    const returnData = {
      orderId: id,
      productName,
      orderAddress: order.address,
      contactEmail,
      reason,
      returnDate: new Date(),
    };

    try {
      await addDoc(collection(db, 'returns'), returnData);
      alert('Return request submitted successfully');
      Navigate('/userDashboard')
    } catch (error) {
      console.error('Error submitting return request:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Return Order Form</h2>
        {order ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="orderNumber">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={id}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="productName">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter the product name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="orderAddress">
                Order Address
              </label>
              <input
                type="text"
                id="orderAddress"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={order.address}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="contactEmail">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="reason">
                Reason for Return
              </label>
              <textarea
                id="reason"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter the reason for return"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Return
            </button>
          </form>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
    </div>
  );
};

export default ReturnOrderForm;
