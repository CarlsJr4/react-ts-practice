import React, { useState } from 'react';
import './App.css';

function App() {
  const [pizza, setPizza] = useState({
    name: 'Spicy Pepperoni',
    toppings: ['Mushroom'],
  });

  const handleClick = () => {
    setPizza({ ...pizza, toppings: [...pizza.toppings, 'Cheese'] });
  };

  return (
    <div className="App">
      <p>{pizza.name}</p>
      <p>{pizza.toppings}</p>
      <button onClick={handleClick}>Add a pizza topping</button>
    </div>
  );
}

export default App;
