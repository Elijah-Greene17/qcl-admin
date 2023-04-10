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
const [time, setTime] = useState(0)

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

  useEffect(()=>{
    console.log("timerEndTime: ", timerEndTime)
    let now = Date.now();
    const duration = timerEndTime-now;
    setTime(duration)

    // let interval = setInterval(() => {
    //   if (time - 1000 >= 0) {
    //     setTime(prevTime => prevTime - 1000);
    //   }
    // }, 1000);

    // return () => clearInterval(interval);

  }, [timerEndTime])

 

  return (
    <MainView style={backgroundStyle}>
      <Timer isRunning={true} startTime={time} />
      <Lobby onSelect={()=>{console.log("none")}} users={users} />
      {hintStatus == "Active" && <Text style={hintStyle}>{hintName} Has Requested a Hint</Text>}
      {hintStatus == "Active" && <SubButton
        title={'Clear'}
        onClick={() => {
          // Connect to the database
          const app = initializeApp(firebaseConfig);
          const db = getDatabase();

          // Set hint status to inactive
          set(ref(db, 'app/hint/status'), 'Inactive');
        }}
      />
}
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
