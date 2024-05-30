import React from 'react';
import axios from 'axios';

const Cart = ({ cartItems, onRemoveFromCart, onOrderComplete }) => {
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleCheckout = async () => {
    try {
      // Create the order
      const orderResponse = await axios.post('http://localhost:5000/orders/create', { 
        orderType: 'takeaway', 
        totalPrice: total, 
        status: 'Pending' 
      });
      const orderId = orderResponse.data.orderId;

      // Add items to the order
      for (const item of cartItems) {
        await axios.post('http://localhost:5000/orders/addItem', { 
          orderId, 
          itemId: item.item_id, 
          quantity: 1 
        });
      }

      // Process payment
      await axios.post('http://localhost:5000/orders/processPayment', { 
        orderId 
      });

      alert('Order placed successfully!');
      onOrderComplete();
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{item.name} - ${item.price}</span>
            <button onClick={() => onRemoveFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default Cart;
