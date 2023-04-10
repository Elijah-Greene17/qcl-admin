import {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import Button from './Button';

const Timer2 = ({isRunning, time}) => {
  const [cycle, setCycle] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const [hourDisplay, setHourDisplay] = useState('0');
  const [minuteDisplay, setMinuteDisplay] = useState('00');
  const [secondDisplay, setSecondDisplay] = useState('00');

  // Run Loop Infinitely
  useEffect(() => {
    if (!isRunning || currentTime <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentTime(prevTime => prevTime - 1000);

      let timeClone = currentTime;
      const h = Math.floor(timeClone / 3600000);
      timeClone = timeClone % 3600000;
      const m = Math.floor(timeClone / 60000);
      timeClone = timeClone % 60000;
      const s = Math.floor(timeClone / 1000);
      setHourDisplay(h.toString());
      setMinuteDisplay(m.toString());
      setSecondDisplay(s.toString());

      setCycle(!cycle);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    isRunning,
    currentTime,
    cycle,
    setHourDisplay,
    setMinuteDisplay,
    setSecondDisplay,
  ]);

  // Handle Starting and Pausing the Timer
  useEffect(() => {
    if (isRunning) {
      //console.log('Starting Timer');
    } else {
      //console.log('Timer is Paused');
    }
  }, [isRunning]);

  // Handle Setting the Timer
  useEffect(() => {
    if (time > 0) {
      setCurrentTime(time);
    }
  }, [time]);

  const timer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    height: '15%',
  };

  const timerText = {
    fontSize: 80,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  };

  return (
    <View style={timer}>
      <Text style={timerText}>
        {hourDisplay}:{minuteDisplay < 10 ? `0${minuteDisplay}` : minuteDisplay}
        :{secondDisplay < 10 ? `0${secondDisplay}` : secondDisplay}
      </Text>
    </View>
  );
};

export default Timer2;
