import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [trackStatus, setTrackStatus] = useState('');
  const [editingOrderId, setEditingOrderId] = useState(null); // To track which order is being edited

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderCollection = collection(db, 'orders');
        const orderSnapshot = await getDocs(orderCollection);
        const ordersData = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const returnCollection = collection(db, 'returns');
        const returnSnapshot = await getDocs(returnCollection);
        const returnList = returnSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const updatedOrdersData = ordersData.map(order => {
          const returnOrder = returnList.find(returnItem => returnItem.orderId === order.id);
          return returnOrder ? { ...order, status: 'Returned' } : order;
        });

        setOrders(updatedOrdersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Function to handle track status update
  const handleTrackUpdate = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        track: trackStatus,
      });
      console.log('Track status updated successfully!');
      setEditingOrderId(null); // Reset editing state after update
    } catch (error) {
      console.error('Error updating track status:', error);
    }
  };

  return (
    <div>
      <div className="py-5">
        <h1 className="text-xl text-green-500 font-bold">All Orders</h1>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
          <thead>
            <tr>
              <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500 font-bold fontPara">S.No.</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500">Order Id</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500">Email</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500">Status</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500">Track</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500">Total Price</th>
              <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500 font-bold fontPara">Payment ID</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500">Quantity</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500">Image</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500">Pin Code</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-500">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="text-pink-300">
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">{index + 1}.</td>
                <td className="h-12 w-[150px] px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">{order.id}</td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-red-500 cursor-pointer">{order.email}</td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-red-500 cursor-pointer">{order.status || 'Confirmed'}</td>
                <td
                  className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-red-500 cursor-pointer"
                  onClick={() => setEditingOrderId(order.id)}
                >
                  {editingOrderId === order.id ? (
                    <input
                      type="text"
                      value={trackStatus}
                      onChange={(e) => setTrackStatus(e.target.value)}
                      onBlur={() => handleTrackUpdate(order.id)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <span>{order.track}</span>
                  )}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">{order.totalPrice}</td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">{order.paymentId}</td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-green-500 cursor-pointer">
                  {order.cartItems.map((item) => (
                    <span key={item.id}>{item.quantity}</span>
                  ))}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                  <img src={order.cartItems[0].imageUrl} alt="" className="h-12 w-12 object-cover" />
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-red-500 cursor-pointer">{order.postalCode}</td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-red-500 cursor-pointer">{order.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
