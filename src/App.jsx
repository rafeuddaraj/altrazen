import React from 'react';
import Countdown from './coming';

const App = () => {
  const targetDate = new Date('2023-11-10T00:00:00').getTime();
  let x = 20;
  return (
    <div>
      <Countdown targetDate={targetDate} />
    </div>
  );
};

export default App;
