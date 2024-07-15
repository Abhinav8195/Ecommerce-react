// App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Details from './components/Details';
import Cart from './components/Cart';
import { AuthContextProvider } from './context/AuthContext';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Allproducts from './components/Allproducts';
import UserD from './components/UserD';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import UpdateProduct from './pages/admin/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentForm from './pages/PaymentForm';
import Return from './pages/Return';
import Wishlist from './pages/Wishlist';


function App() {
  return (
    
      <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forget' element={<ResetPassword />} />
          <Route path='/details/:id' element={<ProtectedRoute><Details /></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/allproducts' element={<ProtectedRoute><Allproducts /></ProtectedRoute>} />
          <Route path='/userDashboard' element={<ProtectedRoute><UserD /></ProtectedRoute>} />
          <Route path='/checkout' element={<ProtectedRoute><PaymentForm /></ProtectedRoute>} />
          <Route path='/editproduct/:id' element={<ProtectedRoute><UpdateProduct /></ProtectedRoute>} />
          <Route path='/return/:id' element={<ProtectedRoute><Return/></ProtectedRoute>} />
          <Route path='/wishlist' element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
  
          <Route path='/adminDashboard' element={<AdminDashboard />} />
          <Route path='/addproducts' element={<AddProduct />} />
          
          
        </Routes>
        <ToastContainer />
      </AuthContextProvider>
      </>
    
  );
}

export default App;
