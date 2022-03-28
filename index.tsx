import React, { useState } from 'react';
import { render } from 'react-dom';
import PointBiserial from './PointBiserial';
import './style.css';

const App = () => {
  const [type, setType] = useState('pb');
  return (
    <div>
      <select
        name="stat type"
        id="stats"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="pb">Point Biserial</option>
        <option value="ch">Chi-square</option>
      </select>
      {type === 'pb' && <PointBiserial />}
    </div>
  );
};

render(<App />, document.getElementById('root'));
