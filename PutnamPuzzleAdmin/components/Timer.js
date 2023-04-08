import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Timer = ({isRunning, startTime}) => {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const hourDisplay = Math.floor(time / 3600000);
  const minuteDisplay = Math.floor((time % 3600000) / 60000);
  const secondDisplay = Math.floor((time % 60000) / 1000);

  return (
    <View style={styles.timer}>
      <Text style={styles.timerText}>
        {hourDisplay}:{minuteDisplay < 10 ? `0${minuteDisplay}` : minuteDisplay}
        :{secondDisplay < 10 ? `0${secondDisplay}` : secondDisplay}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    height: '15%',
  },
  timerText: {
    fontSize: 80,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },
});

export default Timer;
