import React, { useState } from 'react';
import './App.css';

function App() {
  // Task: show all the products
  // When you update cart, update the quantity
  // How do we update an array of objects?
  // NOTE: if the object is unchanged, you don't need to create a new instance of it

  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: 'Product 1', quantity: 1 },
      { id: 2, title: 'Product 2', quantity: 1 },
    ],
  });

  const handleClick = (id: number) => {
    setCart({
      ...cart,
      items: cart.items.map(product =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    });
  };

  return (
    <div className="App">
      <p>Cart app</p>
      <p>Items are discounted at {cart.discount}%</p>
      <div>
        {cart.items.map(item => (
          <div>
            <p>{item.title}</p>
            <p>{item.quantity}</p>
            <button onClick={() => handleClick(item.id)}>Add product</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
