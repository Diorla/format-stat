import React, { useState } from 'react';
import { render } from 'react-dom';
import BLRegression from './BLRegression';
import ChiSquare from './ChiSquare';
import LinearRegression from './LinearRegression';
import PointBiserial from './PointBiserial';
import Spearman from './Spearman';
import './style.css';

const App = () => {
  const [type, setType] = useState('pb');
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
        <option value="sp">Spearman</option>
        <option value="br">Binomial Logistic Regression</option>
      </select>
      {type === 'pb' && <PointBiserial />}
      {type === 'ch' && <ChiSquare />}
      {type === 'lr' && <LinearRegression />}
      {type === 'sp' && <Spearman />}
      {type === 'br' && <BLRegression />}
    </div>
  );
};

render(<App />, document.getElementById('root'));
