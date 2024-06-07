import React, { useState } from 'react';
import Grid from './components/Grid';
import './App.css';

const App = () => {
  const initialGrid = Array(5).fill(null).map(() => Array(5).fill(null));
  const [robot, setRobot] = useState({ x: null, y: null, direction: 'south' });
  const [isPlaced, setIsPlaced] = useState(false);
  const [newPosition, setNewPosition] = useState({ x: '', y: '', direction: 'south' });
  const [location, setLocation] = useState('');
  const directions = ['north', 'east', 'south', 'west'];

  // On change of the input values during  placement function 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPosition((prevPosition) => ({ ...prevPosition, [name]: value }));
  };


  const placeRobot = () => {
    const { x, y, direction } = newPosition;
    const newX = parseInt(x, 10);
    const newY = parseInt(y, 10);
// Test if the coodinates does not exceed the lenght of the x and y coordinates 
    if (
      newX >= 0 && newX < initialGrid[0].length &&
      newY >= 0 && newY < initialGrid.length &&
      directions.includes(direction)
    ) {
      setRobot({ x: newX, y: newY, direction });
      setIsPlaced(true);
      setLocation('');
    } else {
      alert('Invalid position');
    }
  };

   // Set the location state to the current position
  const reportPosition = () => {
    if (!isPlaced) return;
    setLocation(`OUTPUT: ${robot.x}, ${robot.y}, ${robot.direction}`);
  };

  const moveForward = () => {
    if (!isPlaced) return;
    setRobot((prevRobot) => {
      const { x, y, direction } = prevRobot;
      switch (direction) {
        case 'north':
          return { ...prevRobot, y: Math.max(0, y - 1) };
        case 'east':
          // towards east till  4 increment each time with 1
          return { ...prevRobot, x: Math.min(initialGrid[0].length - 1, x + 1) };
        case 'south':
          return { ...prevRobot, y: Math.min(initialGrid.length - 1, y + 1) };
        case 'west':
          return { ...prevRobot, x: Math.max(0, x - 1) };
        default:
          return prevRobot;
      }
    });
  };

  const turnLeft = () => {
    if (!isPlaced) return;
    setRobot((prevRobot) => {
      const currentIndex = directions.indexOf(prevRobot.direction);
      const newIndex = (currentIndex + directions.length - 1) % directions.length;
      return { ...prevRobot, direction: directions[newIndex] };
    });
  };

  const turnRight = () => {
    if (!isPlaced) return;
    setRobot((prevRobot) => {
      const currentIndex = directions.indexOf(prevRobot.direction);
      const newIndex = (currentIndex + 1) % directions.length;
      return { ...prevRobot, direction: directions[newIndex] };
    });
  };


  return (
    <div className="App">
      <h1>Robot Table</h1>
      <Grid grid={initialGrid} robot={robot} />
      <div className="controls">
        <div className="input-controls">
          <input
            type="number"
            name="x"
            value={newPosition.x}
            onChange={handleInputChange}
            placeholder="X"
            className="position-input"
          />
          <input
            type="number"
            name="y"
            value={newPosition.y}
            onChange={handleInputChange}
            placeholder="Y"
            className="position-input"
          />
          <select
            name="direction"
            value={newPosition.direction}
            onChange={handleInputChange}
            className="position-input"
          >
            {directions.map((dir) => (
              <option key={dir} value={dir}>{dir}</option>
            ))}
          </select>
          <button className="robot-controls" onClick={placeRobot}>PLACE</button>
        </div>
        <button className="robot-controls" onClick={turnRight}>RIGHT</button>
        <button className="robot-controls" onClick={moveForward}>MOVE</button>
        <button className="robot-controls" onClick={turnLeft}>LEFT</button>

        <div>
          <button className="robot-controls" onClick={reportPosition}>REPORT</button>
          {location && <div className="output">{location}</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
