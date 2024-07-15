import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowRightAlt } from "react-icons/md";
import { collection, query, where, orderBy, limit, getDocs }  from 'firebase/firestore';
import { db } from '../firebase';


const Items = ({ title, section }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const productCollection = collection(db, 'products');
              let productQuery;

              if (section === 'all') {
                  productQuery = query(productCollection, orderBy('createdAt', 'desc'), limit(4));
              } else {
                  productQuery = query(productCollection, where('section', '==', section), orderBy('createdAt', 'desc'), limit(4));
              }

              const productSnapshot = await getDocs(productQuery);
              const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setProducts(productList);
          } catch (error) {
              console.error('Error fetching products:', error);
          }
      };
      fetchProducts();
  }, [section]);

  function handleDetails(productId) {
    navigate(`/details/${productId}`);
}

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold mb-2 text-3xl text-black">{title}</h2>
                    <h3 className='text-blue-600 hover:text-blue-800 flex items-center'>
                    <Link to={`/allproducts?section=${section}`} className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                            <span>Shop the Collection</span>
                            <MdArrowRightAlt size={30} className="ml-1" />
                        </Link>
                    </h3>
                </div>
                
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                             <div key={product.id} className="group" onClick={() => handleDetails(product.id)}>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        alt={product.title}
                                        src={product.imageUrl}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        onError={(e) => {
                                            console.error('Image load error:', e);
                                            e.target.src = 'https://via.placeholder.com/300'; 
                                        }}
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">₹ {product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        
    );
}

export default Items;
