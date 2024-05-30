import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const OrderStatus = () => {
  const location = useLocation();
  const newOrder = location.state?.newOrder;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders/status');
        console.log('Fetched Orders:', response.data); // Debugging line
        setOrders(response.data.reverse()); // Reverse to show latest orders at the top
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (newOrder && !orders.some(order => order.order_id === newOrder.id)) {
      console.log('Adding new order:', newOrder); // Debugging line
      setOrders(prevOrders => [newOrder, ...prevOrders]); // Add new order at the top
    }
  }, [newOrder, orders]);

  const handleCompleteOrder = async (id) => {
    try {
      console.log('Completing order with ID:', id); // Debugging line
      await axios.post('http://localhost:5000/orders/complete', { orderId: id });
      setOrders(prevOrders => prevOrders.map((order) =>
        order.order_id === id ? { ...order, status: 'Completed' } : order
      ));
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  return (
    <div className="order-status-page">
      <h1>Order Status</h1>
      <ul>
        {orders.map((order) => (
          order.order_id && order.total_price !== undefined && (
            <li 
              key={order.order_id} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => handleCompleteOrder(order.order_id)}
            >
              <span>Order ID: {order.order_id}</span>
              <span>Total: ${order.total_price ? order.total_price.toFixed(2) : 'N/A'}</span>
              <span>Status: {order.status}</span>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default OrderStatus;
