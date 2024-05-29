import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, nextOrderId } = location.state || {};

  // Calculate total price
  const totalPrice = cartItems ? cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0) : 0;

  const handleConfirmOrder = () => {
    const newOrder = {
      id: nextOrderId,
      items: cartItems,
      total: totalPrice,
      status: 'active'
    };
    navigate('/orderstatus', { state: { newOrder } });
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





