import React, { useState } from 'react';
import { render } from 'react-dom';
import ChiSquare from './ChiSquare';
import LinearRegression from './LinearRegression';
import PointBiserial from './PointBiserial';
import './style.css';

const App = () => {
  const [type, setType] = useState('lr');
  return (
    <div>
      <select
        name="stat type"
        id="stats"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="pb">Point Biserial</option>
        <option value="ch">Chi-square</option>
        <option value="lr">Linear Regression</option>
      </select>
      {type === 'pb' && <PointBiserial />}
      {type === 'ch' && <ChiSquare />}
      {type === 'lr' && <LinearRegression />}
    </div>
  );
};

render(<App />, document.getElementById('root'));
