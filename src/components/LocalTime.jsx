'use client';

import { useEffect, useState } from 'react';

const TIME_ZONE = 'Asia/Nicosia';

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const getCurrentTime = () => formatter.format(new Date());
const INITIAL_TIME = '--:--:--';

export function LocalTime() {
  const [currentTime, setCurrentTime] = useState(INITIAL_TIME);

  useEffect(() => {
    setCurrentTime(getCurrentTime());
    const interval = window.setInterval(() => setCurrentTime(getCurrentTime()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="scene-label local-time" aria-label={`Current time in Cyprus: ${currentTime}`}>
      <span>CYPRUS / LOCAL TIME</span>
      <time>{currentTime}</time>
    </div>
  );
}
