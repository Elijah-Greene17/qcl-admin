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
  const [completed, setCompleted] = useState(false);

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
    code,
    userCode,
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

  useEffect(() => {
    if (userCode != '' && userCode === code) {
      console.log('The Quest was completed by the Team!');
      setCompleted(true);
    }
  }, [userCode]);

  useEffect(() => {
    // Calculate Time Remaining
    const currentTime = Date.now();
    let timeRemaining = timerEndTime - currentTime;
    setTime(timeRemaining);

    // count down timer
    const timer = setInterval(() => {
      console.log(timeRemaining);
      if (timeRemaining > 0) {
        timeRemaining -= 1000;
        setTime(timeRemaining);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
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
      {code == userCode && (
        <Text style={hintStyle}>The Quest was completed by the Team!</Text>
      )}
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
          // Connect to the database
          const app = initializeApp(firebaseConfig);
          const db = getDatabase();
          set(ref(db, 'app/currentState'), 'Inactive');

          // Clear users from database
          set(ref(db, 'app/users'), {});
        }}
      />
    </MainView>
  );
};

export default A3QuestPage;
