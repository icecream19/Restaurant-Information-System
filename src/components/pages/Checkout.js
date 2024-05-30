import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, dineIn } = location.state || {};

  const totalPrice = cartItems ? cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0) : 0;

  const handleConfirmOrder = async () => {
    try {
      const orderType = dineIn ? 'dine-in' : 'takeaway';
      const orderResponse = await axios.post('http://localhost:5000/orders/create', {
        orderType,
        totalPrice
      });
      const orderId = orderResponse.data.orderId;

      for (const item of cartItems) {
        await axios.post('http://localhost:5000/orders/addItem', {
          orderId,
          itemId: item.item_id,
          quantity: 1
        });
      }

      await axios.post('http://localhost:5000/orders/processPayment', { orderId, dineIn });

      navigate('/orderstatus', { state: { newOrder: { id: orderId, items: cartItems, total: totalPrice, status: 'Pending' } } });
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="cart-items">
        <h2>Cart</h2>
        <ul>
          {cartItems && cartItems.length > 0 && cartItems.map((item, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{item.name} - ${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="total-price">
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>
      <button className="confirm-order-button" onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
};

export default Checkout;
