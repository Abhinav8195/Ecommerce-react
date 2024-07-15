import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterSearchData = products.filter((product) => {
    if (product && product.title) {
      return product.title.toLowerCase().includes(search.toLowerCase());
    }
    return false;
  }).slice(0, 8);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <div className="relative">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search here"
          value={search}
          onChange={handleSearchChange}
          className="bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-full lg:w-96 outline-none text-black"
        />
      </div>

      {search && (
        <div className="absolute bg-gray-200 w-full lg:w-96 z-50 mt-1 rounded-lg px-2 py-2">
          {filterSearchData.length > 0 ? (
            filterSearchData.map((item, index) => (
              <Link key={index} to={`/details/${item.id}`} className="block" onClick={clearSearch}>
                <div className="py-2 px-2 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-full" />
                    {item.title}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex justify-center">
              <img className="w-20" src="" alt="No results found" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
