import { StarIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';

import { toast } from 'react-toastify';




const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Details() {
 const {user}= UserAuth()
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState(product?.sizes && product.sizes.length > 0 ? product.sizes[0] : null);


  console.log(product)
  
  console.log(id)
  console.log(user)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', id);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() });
          setSelectedColor(productDoc.data().colors[0]);
          setSelectedSize(productDoc.data().sizes && productDoc.data().sizes.length > 0 ? productDoc.data().sizes[0] : null);
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // const handleaddtocart = () => {
  //   dispatch(addToCart(product)); 
  // };

  // const handleRemoveFromCart = () => {
  //   dispatch(removefromcart(product.id));
  // }

  const handleAddToCart = async () => {
    try {
      const userId = user.uid;
      const cartRef = collection(db, 'carts', userId, 'items');
      await addDoc(cartRef, {
        productId: product.id,
        quantity: 1,
        imageUrl: product.imageUrl,
        price: product.price,
        title: product.title,
        color: selectedColor,
        size: selectedSize,
        timestamp: new Date(),
      });

      toast.success('Product added to cart successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Error adding product to cart. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  if (!product) {
    return <div>Loading...</div>;
  }
 
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  

  return (
    <>
    <div className="bg-white">      
      <div className="pt-6">
        {/* <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
           
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav> */}

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              alt={product?.title}
              src={product?.imageUrl}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt={product?.title}
                src={product?.imageUrl}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt={product?.title}
                src={product?.imageUrl}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              alt={product?.title}
              src={product?.imageUrl}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">₹ {product?.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0',
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

           
              {/* Colors */}
              <form className="mt-10">
  <div>
    <h3 className="text-sm font-medium text-gray-900">Color</h3>
    <div className="mt-4">
      <div className="flex items-center space-x-3">
        {product.colors && product.colors.map((color, index) => (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="color"
              value={color}
              checked={selectedColor === color}
              onChange={() => setSelectedColor(color)}
              className="hidden"
            />
            <span
              className={classNames(
                selectedColor === color
                  ? 'ring-2 ring-indigo-500'
                  : 'ring-1 ring-gray-300',
                'inline-block h-8 w-8 rounded-full'
              )}
              style={{ backgroundColor: color }}
            ></span>
          </label>
        ))}
      </div>
    </div>
  </div>

  {/* Sizes */}
  <div className="mt-10">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-900">Size</h3>
      <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
        Size guide
      </a>
    </div>

    <div className="mt-4">
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
        {product.sizes && product.sizes.map((size, index) => (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="size"
              value={size}
              checked={selectedSize === size}
              onChange={() => setSelectedSize(size)}
              className="hidden"
            />

            <span
              className={classNames(
                selectedSize === size
                  ? 'ring-2 ring-indigo-500'
                  : 'ring-1 ring-gray-300',
                'inline-block rounded-md border px-4 py-3 text-sm font-medium uppercase'
              )}
            >
              {size}
            </span>
          </label>
        ))}
      </div>
    </div>
  </div>

  <button
    type="button"
    onClick={handleAddToCart}
    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    Add To Cart
  </button>
</form>
</div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product?.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlighted && product.highlighted.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product?.details}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
   
    </div>
      <ToastContainer/>
    </>
  )
}
