import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import  {UserAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [displayName, setDisplayName] = useState('');

  const {  signUp,signInWithGoogle } = UserAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password,displayName);
      navigate('/'); 
    } catch (error) {
      console.log(error);
    }
  };
  const handlegoogleSignIn = async(e)=>{
    e.preventDefault();
    try {
      await signInWithGoogle();
      navigate('/');
    }catch(error){
      console.log(error)
    }
  }

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
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                 onChange={(e) => setDisplayName(e.target.value)}
                  id="displayName"
                  name="displayName"
                  type="text"
                  required
                  autoComplete='username'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={(e)=>setEmail(e.target.value)}
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
                
              </div>
              <div className="mt-2">
                <input
                 onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Log In Now
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
                Sign up with Google
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
