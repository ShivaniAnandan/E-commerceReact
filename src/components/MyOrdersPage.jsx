import React, { useEffect, useState } from 'react';
import axios from 'axios'; // for making API calls


const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // assuming auth token is stored in localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const { data } = await axios.get('http://localhost:4000/api/orders/myorders', config); // API call to get orders
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-info">
                <h2>Order</h2>
                <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ₹{order.totalPrice}</p>
                {/* <p>Status: {order.isPaid ? 'Paid' : 'Pending'}</p> */}
              </div>
              <div className="order-items">
                {order.orderItems.map((item) => (
                  <div className="order-item" key={item._id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p>Qty: {item.qty}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
