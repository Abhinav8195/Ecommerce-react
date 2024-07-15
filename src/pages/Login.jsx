import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useState } from 'react';

const Login = () => {

  const navigate = useNavigate();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const{user,logIn,signInWithGoogle}=UserAuth()

  const handlegoogleSignIn = async(e)=>{
    e.preventDefault();
    try {
      await signInWithGoogle();
      navigate('/');
    }catch(error){
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate('/'); 
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                onChange={(e)=>setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to={'/forget'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                 onChange={(e)=>setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Create Account Now 
            </Link>
          </p>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button onClick={handlegoogleSignIn}
                type="button"
                className="inline-flex w-full justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >
               <img src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png" alt="Google" className="h-5 w-5 mr-2" />
                Sign in with Google
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
