import React from 'react';
import { XAxis } from 'recharts';

const HourAxis = (props) => {
  // You can add logic here if needed, or pass props through
  return (
    <XAxis
      dataKey="time"
      stroke="#a1a1aa"
      tickLine={false}
      axisLine={false}
      interval={2}
      padding={{ left: 12, right: 10 }}
      tick={{ fontSize: 12 }} // Example: Moved styling here
      {...props} // Pass any additional props down
    />
  );
};

export default HourAxis;
