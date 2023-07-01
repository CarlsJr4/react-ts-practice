import React, { useState } from 'react';
import './App.css';

function App() {
  // Task: Click the button to update the name

  const [game, setGame] = useState({
    id: 1,
    player: {
      name: 'John',
    },
  });

  const handleClick = () => {
    setGame({ ...game, player: { ...game.player, name: 'Carl' } });
  };

  return (
    <div className="App">
      <p>{game.player.name}</p>
      <button onClick={handleClick}>Change game</button>
    </div>
  );
}

export default App;
