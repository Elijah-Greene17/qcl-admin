import {View, Text, Image, Pressable} from 'react-native';
import Button from '../components/Button';

import Timer from '../components/Timer';
import MainView from '../components/MainView';
import Spacer from '../components/Spacer';
import {useContext, useEffect, useRef, useState} from 'react';
import Lobby from '../components/Lobby';

import {firebaseConfig} from '../components/firebaseConfig';

import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';
import Timer2 from '../components/Timer2';
import {AppContext} from '../Contexts/AppContext';
import {CurrentRenderContext} from '@react-navigation/native';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAYWnHYwXqH17hZbXIAT76bFgtN7gNyY7Q',
//   authDomain: 'quietcornerquests.firebaseapp.com',
//   projectId: 'quietcornerquests',
//   storageBucket: 'quietcornerquests.appspot.com',
//   messagingSenderId: '170321202795',
//   appId: '1:170321202795:web:ee95b6d259360368fc6b2e',
//   measurementId: 'G-0RJ6VZ0546',
// };

const A0HomePage = ({navigation, route}) => {
  const {
    currentAppState,
    setCurrentAppState,
    hintCooldown,
    setHintCooldown,
    hintStatus,
    setHintStatus,
    timerEndTime,
    setTimerEndTime,
    users,
    setUsers,
    timeToSet,
  } = useContext(AppContext);

  const backgroundStyle = {
    backgroundColor: '#FFD2D2',
    height: '100%',
    width: '100%',
  };

  return (
    // Header: 25%; Timer: 15%, Lobby: 35%, Button: 20%
    <MainView style={backgroundStyle}>
      <Spacer height={'50%'} />
      <Button
        title={'Initiate New Quest'}
        onClick={() => {
          // Set current state in database
          const app = initializeApp(firebaseConfig);
          const db = getDatabase();

          set(ref(db, 'app/currentState'), 'Inactive');
        }}
      />
    </MainView>
  );
};

export default A0HomePage;
