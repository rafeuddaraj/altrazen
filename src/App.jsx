import React from 'react';
import Countdown from './coming';

const App = () => {
  const targetDate = new Date('2023-07-01T00:00:00').getTime();

  return (
    <div>
      <Countdown targetDate={targetDate} />
    </div>
  );
};

export default App;
