import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OrderStatus = () => {
  const location = useLocation();
  const newOrder = location.state?.newOrder;

  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

useEffect(() => {
  if (newOrder && !orders.some(order => order.id === newOrder.id)) {
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  }
}, [newOrder]); // Only trigger when newOrder changes


  const handleCompleteOrder = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: 'complete' } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="order-status-page">
      <h1>Order Status</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Order ID: {order.id}</span>
            <span>Total: ${order.total.toFixed(2)}</span>
            <span>Status: {order.status}</span>
            {order.status === 'active' && (
              <button onClick={() => handleCompleteOrder(order.id)}>Complete Order</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderStatus;






