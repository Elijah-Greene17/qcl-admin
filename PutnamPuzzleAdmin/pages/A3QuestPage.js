import {View, Text, Image, Pressable, TextInput, AppState} from 'react-native';
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
  const [confirm, setConfirm] = useState(false);

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

  const confirmStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '5%',
  };

  // useEffect(() => {
  //   console.log('App State Listener Activated');
  //   const currentTime = Date.now();
  //   let timeRemaining = timerEndTime - currentTime;
  //   setTime(timeRemaining);
  // }, [AppState.currentState]);

  useEffect(() => {
    console.log('test');
    console.log(userCode);
    console.log(code);
    if (userCode != '' && userCode == code) {
      console.log('The Quest was completed by the Team!');
      setCompleted(true);
      // Connect to the database
      const app = initializeApp(firebaseConfig);
      const db = getDatabase();
      //set(ref(db, 'app/timer/endTime'), -1);
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
      if (timeRemaining > 0 && !completed) {
        timeRemaining = timerEndTime - Date.now();
        setTime(timeRemaining);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timerEndTime, completed]);

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
            set(ref(db, 'app/hint/cooldown'), Date.now() + 8 * 60 * 1000);
          }}
        />
      )}

      {!confirm && (
        <Button
          title={'End Quest'}
          onClick={() => {
            setConfirm(true);
          }}
        />
      )}

      {confirm && (
        <View>
          <Spacer height={'5%'} />
          <Text style={hintStyle}>Are you sure you want to end the quest?</Text>
          <View style={confirmStyle}>
            <SubButton
              title={'Yes'}
              onClick={() => {
                // Connect to the database
                const app = initializeApp(firebaseConfig);
                const db = getDatabase();
                set(ref(db, 'app/currentState'), 'Uninitiated');
                set(ref(db, 'app/timer/endTime'), -1);
                set(ref(db, 'app/code/userEntered'), '');
                set(ref(db, 'app/hint/status'), 'Inactive');
                set(ref(db, 'app/hint/by'), '');
                set(ref(db, 'app/hint/cooldown'), 0);
                set(ref(db, 'app/userIndex'), 0);

                // Clear users from database
                set(ref(db, 'app/users'), {});
                setConfirm(false);
              }}
            />
            <View style={{width: '10%'}} />
            <SubButton
              title={'No'}
              onClick={() => {
                setConfirm(false);
              }}
            />
          </View>
        </View>
      )}
    </MainView>
  );
};

export default A3QuestPage;
