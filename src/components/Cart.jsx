import React, { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext.jsx';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [pid, setPid] = useState([]);
  const { user } = UserAuth();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = user.uid;
        const cartItemsRef = collection(db, `carts/${userId}/items`);
        const querySnapshot = await getDocs(cartItemsRef);
        const items = [];

        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });

        setCartItems(items);
        updateLocalStorage(items); 
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (user) {
      fetchCartItems();
    }
  }, [user]);

  useEffect(() => {
    const fetchProductIds = async () => {
      try {
        const productInfoRef = collection(db, `carts/${user.uid}/items`);
        const querySnapshot = await getDocs(productInfoRef);

        const productIds = [];
        querySnapshot.forEach((doc) => {
          const productId = doc.data().productId;
          productIds.push(productId);
        });

        setPid(productIds);
      } catch (error) {
        console.error('Error fetching product ids:', error);
      }
    };

    if (user) {
      fetchProductIds();
    }
  }, [user]);

  useEffect(() => {
    // Calculate total price
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += +item.price * item.quantity; 
    });
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const updateLocalStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const productRef = doc(db, 'carts', user.uid, 'items', productId);
      await deleteDoc(productRef);
      console.log('Product successfully deleted!');
      setCartItems((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      updateLocalStorage(cartItems.filter((product) => product.id !== productId)); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };


  function handleViewProduct(productId) {
    navigate(`/details/${productId}`);
  }

  return (
    <>
      <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cart Items</h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
              <h2 id="cart-heading" className="sr-only"></h2>

              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((product, index) => (
                  <div key={product.id}>
                    <li className="flex py-6 sm:py-6 ">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <button
                                  type="button"
                                  className="font-semibold text-black"
                                  onClick={() => handleViewProduct(pid[index])} 
                                >
                                  {product.title}
                                </button>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-sm text-gray-500">{product.color}</p>
                              {product.size ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                  {product.size}
                                </p>
                              ) : null}
                            </div>
                            <div className="mt-1 flex items-end">
                              <p className="text-xs font-medium text-gray-500 line-through">
                                {product.originalPrice}
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                &nbsp;&nbsp;₹  {product.price}
                              </p>
                              <p className="text-sm font-medium text-green-500">{product.discount}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <div className="mb-2 flex">
                      <div className="min-w-24 flex">
                        <button
                          type="button"
                          className="h-7 w-7"
                          onClick={() =>
                            handleQuantityChange(product.id, Math.max(product.quantity - 1, 1))
                          }
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="mx-1 h-7 w-9 rounded-md border text-center"
                          value={product.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center"
                          onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="ml-6 flex text-sm">
                        <button
                          type="button"
                          className="flex items-center space-x-1 px-2 py-1 pl-0"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash size={12} className="text-red-500" />
                          <span className="text-xs font-medium text-red-500">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              ></h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">Price ({cartItems.length} item)</dt>
                    <dd className="text-sm font-medium text-gray-900">₹ {totalPrice}</dd>
                  </div>
                  {/* <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-sm text-gray-800">
                      <span>Discount</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">- ₹ 3,431</dd>
                  </div> */}
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                    <dd className="text-base font-medium text-gray-900">₹ {totalPrice}</dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  <div className="flex gap-4 mb-6">
                    <Link to={'/checkout'} className="w-full px-4 py-3 text-center text-gray-100 bg-green-600 border border-transparent dark:border-gray-700 hover:border-green-500 hover:text-green-700 hover:bg-green-100 rounded-xl">
                     Proceed to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cart;
