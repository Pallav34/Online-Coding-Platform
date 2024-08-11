import React, { useState, useEffect } from 'react';

const Timer = ({ onEnd }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev >= 60) {
          clearInterval(timer);
          onEnd();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onEnd]);

  return (
    <div className="timer">
      <h2>Time Remaining: {60 - time}s</h2>
    </div>
  );
};

export default Timer;
