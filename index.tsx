import React from 'react';
import { render } from 'react-dom';
import PointBiserial from './PointBiserial';
import './style.css';

const App = () => {
  return (
    <div>
      <PointBiserial />
    </div>
  );
};

render(<App />, document.getElementById('root'));
