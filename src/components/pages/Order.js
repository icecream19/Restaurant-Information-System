import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../Elements/Menu';
import Cart from '../Elements/Cart';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dineIn = location.state?.dineIn || false;
  const [cartItems, setCartItems] = useState([]);
  const [nextOrderId, setNextOrderId] = useState(1); // Initialize the next order ID

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems, nextOrderId } }); // Pass cartItems and nextOrderId to Checkout page
  };

  return (
    <div>
      <div className="OrderHeading">
        {dineIn ? (
          <h1>Dine In Order Page</h1>
        ) : (
          <h1>Takeaway Order Page</h1>
        )}
      </div>
      <div className="order-page">
        <div>
          <Menu onAddToCart={handleAddToCart} dineIn={dineIn} /> {/* Pass dineIn prop to Menu component */}
        </div>
        <div>
          <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
          <button className="option-button checkout" onClick={handleCheckout}>Go to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Order;







