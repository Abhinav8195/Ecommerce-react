import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from "react-router-dom";

const UserD = () => {
    const { user } = UserAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderCollection = collection(db, 'orders');
                const orderSnapshot = await getDocs(orderCollection);
                const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const returnCollection = collection(db, 'returns');
                const returnSnapshot = await getDocs(returnCollection);
                const returnList = returnSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const updatedOrderList = orderList.map(order => {
                    const returnOrder = returnList.find(returnItem => returnItem.orderId === order.id);
                    return returnOrder ? { ...order, status: 'Returned' } : order;
                });

                setProducts(updatedOrderList);
                console.log(updatedOrderList);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 py-5 lg:py-8">
                <div className="top">
                    <div className="bg-green-50 py-5 rounded-xl border border-green-100">
                        <div className="flex justify-center">
                            <img src={user?.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"} alt="" className="w-24 h-24 rounded-full"/>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-center text-lg"><span className="font-bold">Name :</span> {user?.displayName}</h1>
                            <h1 className="text-center text-lg"><span className="font-bold">Email :</span> {user?.email}</h1>
                        </div>
                    </div>
                </div>
                <div className="bottom mt-8">
                    <div className="mx-auto max-w-6xl px-2 md:px-0">
                        <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>
                        {products.filter(order => order.uid === user.uid).map((order) => (
                            <div key={order.id} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row">
                                <div className="w-full border-r border-green-100 bg-green-50 md:max-w-xs p-4 md:p-8">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 gap-4">
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold text-black">Order Id</div>
                                            <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold">Date</div>
                                            <div className="text-sm font-medium text-gray-900">4 March, 2023</div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold">Total Amount</div>
                                            <div className="text-sm font-medium text-gray-900"> ₹  {order.totalPrice}</div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold">Order Status</div>
                                            <div className={`text-sm font-medium ${order.status === 'Returned' ? 'text-red-600' : 'text-green-800'}`}>
                                                {order.status || 'Confirmed'}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold">Track Order</div>
                                            <div className="text-sm font-medium text-green-700">{order.track}</div>
                                        </div>
                                        <div className="mb-4">
                                            <Link to={`/return/${order.id}`} className="text-sm font-semibold border-b">Return Order?</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 p-4 md:p-8">
                                    <ul className="-my-7 divide-y divide-gray-200">
                                        {order.cartItems.map((item) => (
                                            <li key={item.id} className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                                <div className="flex flex-1 items-stretch">
                                                    <div className="flex-shrink-0">
                                                        <img className="h-20 w-20 rounded-lg border border-gray-200 object-contain" src={item.imageUrl} alt={item.title} />
                                                    </div>
                                                    <div className="ml-5 flex flex-col justify-between">
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-gray-900">{item.title}</p>
                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{item.color}</p>
                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{item.size}</p>
                                                        </div>
                                                        <p className="mt-4 text-sm font-medium text-gray-500">x {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="ml-auto flex flex-col items-end justify-between">
                                                    <p className="text-right text-sm font-bold text-gray-900">₹{item.price}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserD;
