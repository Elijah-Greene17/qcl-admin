import { View, Text, Image, Pressable } from 'react-native';
import Button from '../components/Button';

import Timer from '../components/Timer';
import MainView from '../components/MainView';
import Spacer from '../components/Spacer';
import { useContext, useEffect, useRef, useState } from 'react';
import Lobby from '../components/Lobby';

import { initializeApp } from "firebase/app"
import { getDatabase, onValue, ref, set } from "firebase/database"
import Timer2 from '../components/Timer2';
import { AppContext } from '../Contexts/AppContext';
import { CurrentRenderContext } from '@react-navigation/native';

const firebaseConfig = {
  apiKey: "AIzaSyAYWnHYwXqH17hZbXIAT76bFgtN7gNyY7Q",
  authDomain: "quietcornerquests.firebaseapp.com",
  projectId: "quietcornerquests",
  storageBucket: "quietcornerquests.appspot.com",
  messagingSenderId: "170321202795",
  appId: "1:170321202795:web:ee95b6d259360368fc6b2e",
  measurementId: "G-0RJ6VZ0546"
}

const A1StartPage = ({ navigation, route }) => {
  const [approvedPlayers, setApprovedPlayers] = useState({})
  //const { data } = route.params ? route.params : 2000;
  const { setTimerIsRunning, timerIsRunning, timerSetting } = useContext(AppContext);

  const backgroundStyle = {
    backgroundColor: '#FFD2D2',
    height: '100%',
    width: '100%',
  };

  const timeControlStyle = {
    height: '5%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }

  const setTimeStyle = {
  }
  const pauseTimeStyle = {
  }

  const setTimeTextStyle = {
    color: 'blue',
    fontSize: 20
  }

  const setPlayers = (players) => {
    setApprovedPlayers(players)
  }

  useEffect(() => {
    //console.log("EG: ", data)
  }, [])

  return (
    // Header: 25%; Timer: 15%, Lobby: 35%, Button: 20%
    <MainView style={backgroundStyle}>
      <Timer2 isRunning={timerIsRunning} time={timerSetting} />
      <View style={timeControlStyle}>
        <Pressable onPress={() => { setTimerIsRunning(!timerIsRunning) }} style={pauseTimeStyle}>
          <Text style={setTimeTextStyle}>Pause/Resume</Text>
        </Pressable>
        <Pressable onPress={() => { navigation.replace('A2'); }} style={setTimeStyle}>
          <Text style={setTimeTextStyle}>SetTime</Text>
        </Pressable>
      </View>
      <Lobby onSelect={setPlayers} />
      <Button
        title={'Start Quest'}
        onClick={() => {
          // const app = initializeApp(firebaseConfig)
          // const db = getDatabase()

          // const now = Date.now()
          // console.log((new Date(now)).toString())
          // const later = now + parseInt(data)
          // console.log((new Date(later)).toString())
          // const laterDbObj = {
          //   endTime: later
          // }
          // set(ref(db, 'app/timer'), laterDbObj);
          //navigation.replace('A2');

          //timerComponent.current.pingTimer()

          // setTimer(10000)
          setTimerIsRunning(true)

        }}
      />
    </MainView>
  );
};

export default A1StartPage;
