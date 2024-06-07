import React from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import './Grid.css';

const Grid = ({ grid, robot }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            // x and y will be the coordinates and rowIndex and cellIndex
            <div key={cellIndex} className={`cell ${robot.x === cellIndex && robot.y === rowIndex ? 'robot' : ''}`}>
              {/* If the rowIndex and cellIndex the currect cell then place the robot */}
              {robot.x === cellIndex && robot.y === rowIndex && <div className={`robot-icon ${robot.direction}`}><SmartToyIcon/></div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
