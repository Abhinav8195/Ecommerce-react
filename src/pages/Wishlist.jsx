import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MdArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const wishlistCollection = collection(db, 'products');
                const wishlistQuery = query(wishlistCollection, where('wishlist', '==', true));
                const wishlistSnapshot = await getDocs(wishlistQuery);
                const wishlistList = wishlistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setWishlistItems(wishlistList);
            } catch (error) {
                console.error('Error fetching wishlist items:', error);
            }
        };
        fetchWishlistItems();
    }, []);

    
    const handleRemoveFromWishlist = async (productId, event) => {
        event.stopPropagation(); 
        try {
            const productRef = doc(db, 'products', productId);
            await updateDoc(productRef, { wishlist: false }); 

           
            setWishlistItems(wishlistItems.filter(item => item.id !== productId));

            console.log('Removed from wishlist:', productId);
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const handleDetails = (productId) => {
        navigate(`/details/${productId}`);
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
                        <MdArrowLeft size={24} className="mr-1" />
                        <span>Back to Home</span>
                    </Link>
                    <h2 className="font-bold text-3xl text-black">My Wishlist</h2>
                    <div className="invisible">Placeholder for spacing</div>
                </div>
                {wishlistItems.length === 0 ? (
                    <p className="text-gray-600">Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {wishlistItems.map((product) => (
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
                                <button
                                    onClick={(e) => handleRemoveFromWishlist(product.id, e)}
                                    className="mt-2 flex items-center text-gray-600 hover:text-red-500"
                                >
                                    Remove from Wishlist
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
