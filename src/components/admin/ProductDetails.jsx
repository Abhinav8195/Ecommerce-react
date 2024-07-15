import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const ProductDetail = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollection = collection(db, 'products');
                const productSnapshot = await getDocs(productCollection);
                const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productList);
                console.log(productList);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            const productRef = doc(db, 'products', productId);
            await deleteDoc(productRef);
            console.log('Product successfully deleted!');
            // Update state to remove the deleted product from the UI
            setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-xl text-green-500 font-bold">All Product</h1>
                <button className="px-5 py-2 bg-green-300 border hover:bg-green-200 border-pink-100 rounded-lg">
                    <Link to={'/addproducts'}>Add Product</Link>
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <thead>
                        <tr>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-500 text-slate-700 bg-slate-500 font-bold fontPara">S.No.</th>
                            <th className="h-12 w-[150px] px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-500 text-slate-700 bg-slate-500">Image</th>
                            <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-500 text-slate-700 bg-slate-500">Title</th>
                            <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-500 text-slate-700 bg-slate-500">Price</th>
                            <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-500 text-slate-700 bg-slate-500">Category</th>
                            <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-500 text-slate-700 bg-slate-500">Action</th>
                            <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-500 text-slate-700 bg-slate-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id} className="text-pink-300">
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                    {index + 1}.
                                </td>
                                <td className="h-12 w-[150px] px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                    <img src={product?.imageUrl} alt="" />
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                    {product.title}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                    {product.price}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                    {product.category}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-green-500 cursor-pointer">
                                    <Link to={`/editproduct/${product.id}`}>Edit</Link>
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-red-500 cursor-pointer">
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;
