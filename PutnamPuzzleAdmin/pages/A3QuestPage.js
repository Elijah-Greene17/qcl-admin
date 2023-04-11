import {View, Text, Image, Pressable, TextInput} from 'react-native';
import Button from '../components/Button';
import SubButton from '../components/SubButton';

import Timer from '../components/Timer';
import MainView from '../components/MainView';
import Spacer from '../components/Spacer';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../Contexts/AppContext';
import Lobby from '../components/Lobby';

import {firebaseConfig} from '../components/firebaseConfig';

import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';

const A3QuestPage = ({navigation}) => {
  const [time, setTime] = useState(0);

  const {
    currentAppState,
    setCurrentAppState,
    hintCooldown,
    setHintCooldown,
    hintName,
    hintStatus,
    setHintStatus,
    timerEndTime,
    setTimerEndTime,
    users,
    setUsers,
  } = useContext(AppContext);

  const backgroundStyle = {
    backgroundColor: '#FFD2D2',
    height: '100%',
    width: '100%',
  };

  const hintStyle = {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  };

  const updateTimer = t => {
    console.log('Updating Timer');

    if (t) {
      console.log('t exists: ' + t);
      setTime(t);
    }

    if (t > 0) {
      setTimeout(() => updateTimer(t - 1000), 1000);
    }
  };

  useEffect(() => {
    console.log('Test');
  });

  useEffect(() => {
    // Calculate Time Remaining
    console.log('Running Use Effect');
    const currentTime = Date.now();
    const timeRemaining = timerEndTime - currentTime;
    console.log('Time Remaining: ' + timeRemaining);
    setTime(timeRemaining);
    setTimeout(() => {
      updateTimer(timeRemaining);
    }, 1000);
  }, [timerEndTime]);

  return (
    <MainView style={backgroundStyle}>
      <Timer isRunning={true} startTime={time} />
      <Lobby
        onSelect={() => {
          console.log('none');
        }}
        users={users}
      />
      {hintStatus == 'Active' && (
        <Text style={hintStyle}>{hintName} Has Requested a Hint</Text>
      )}
      {hintStatus == 'Active' && (
        <SubButton
          title={'Clear'}
          onClick={() => {
            // Connect to the database
            const app = initializeApp(firebaseConfig);
            const db = getDatabase();

            // Set hint status to inactive
            set(ref(db, 'app/hint/status'), 'Inactive');
          }}
        />
      )}
      <Button
        title={'End Quest'}
        onClick={() => {
          setTimerIsRunning(!timerIsRunning);
        }}
      />
    </MainView>
  );
};

export default A3QuestPage;
