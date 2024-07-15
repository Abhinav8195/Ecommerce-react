import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const ButNowPage = ({ open, handleClose, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('PaymentMethod', paymentMethod);
      alert('Payment Successful!');
      handleClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <CardElement className="border rounded p-2 mb-4" />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Pay ₹ {totalPrice.toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ButNowPage;
