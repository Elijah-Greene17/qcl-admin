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
    setQuestNo,
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

          fetch('https://qcq-dd80551a4b64.herokuapp.com/api/read', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              let id = -1;
              data.forEach(element => {
                console.log('element.QuestID: ' + element.QuestID);
                if (element.QuestID && parseInt(element.QuestID) > id) {
                  id = parseInt(element.QuestID);
                }
              });
              id++;
              if (id / 1000 > 1) {
                const app = initializeApp(firebaseConfig);
                const db = getDatabase();
                set(ref(db, 'app/questId'), id);
                console.log(id);
              } else if (id / 100 > 1) {
                // setQuestNo('0' + id);
                // console.log('0' + id);
                // connect to db
                const app = initializeApp(firebaseConfig);
                const db = getDatabase();
                set(ref(db, 'app/questId'), '0' + id);
                console.log('0' + id);
              } else if (id / 10 > 1) {
                const app = initializeApp(firebaseConfig);
                const db = getDatabase();
                set(ref(db, 'app/questId'), '00' + id);
                console.log('00' + id);
              } else {
                const app = initializeApp(firebaseConfig);
                const db = getDatabase();
                set(ref(db, 'app/questId'), '000' + id);
                console.log('000' + id);
              }
            });
        }}
      />
    </MainView>
  );
};

export default A0HomePage;
