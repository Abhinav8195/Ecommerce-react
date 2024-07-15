import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const {user,resetPassword } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      console.error(error);
      setMessage('Failed to reset password');
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='max-w-md w-full bg-gray-800 p-8 rounded'>
        <h2 className='text-3xl text-white mb-4'>Reset Password</h2>
        {message && <p className='text-white mb-4'>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className='w-full p-2 mb-4 bg-gray-700 rounded text-white'
            type='email'
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <button className='w-full p-2 bg-green-500 rounded text-white'>Send Reset Link</button>
        </form>
        <div className='text-center mt-4'>
          <Link className='text-gray-400' to='/login'>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
