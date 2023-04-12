/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';

import MainView from './components/MainView';
import SafeViewAndroid from './components/SafeViewAndroid';
import {AppContext} from './Contexts/AppContext';
import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import A1StartPage from './pages/A1StartPage';
import A2SetTimer from './pages/A2SetTimer';
import A3QuestPage from './pages/A3QuestPage';

import {firebaseConfig} from './components/firebaseConfig';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAYWnHYwXqH17hZbXIAT76bFgtN7gNyY7Q',
//   authDomain: 'quietcornerquests.firebaseapp.com',
//   databaseURL: 'https://quietcornerquests-default-rtdb.firebaseio.com',
//   projectId: 'quietcornerquests',
//   storageBucket: 'quietcornerquests.appspot.com',
//   messagingSenderId: '170321202795',
//   appId: '1:170321202795:web:ee95b6d259360368fc6b2e',
//   measurementId: 'G-0RJ6VZ0546',
// };

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const [currentAppState, setCurrentAppState] = useState('Inacvitve');
  const [code, setCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [hintName, setHintName] = useState('Error');
  const [hintCooldown, setHintCooldown] = useState(0);
  const [hintStatus, setHintStatus] = useState('Inactive');
  const [timerEndTime, setTimerEndTime] = useState(0);
  const [users, setUsers] = useState([]);
  const [timeToSet, setTimeToSet] = useState(7200000);

  const backgroundStyle = {
    backgroundColor: '#FFD2D2',

    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
  };

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'app');
    onValue(dbRef, snapshot => {
      const data = snapshot.val();
      setCurrentAppState(data.currentState);
      setHintCooldown(data.hint.cooldown);
      setCode(data.code.value);
      setUserCode(data.code.userEntered);
      setHintStatus(data.hint.status);
      setHintName(data.hint.by);
      setTimerEndTime(data.timer.endTime);
      setUsers(data.users);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentAppState,
        setCurrentAppState,
        code,
        setCode,
        userCode,
        setUserCode,
        hintName,
        setHintName,
        hintCooldown,
        setHintCooldown,
        hintStatus,
        setHintStatus,
        timerEndTime,
        setTimerEndTime,
        users,
        setUsers,
        timeToSet,
        setTimeToSet,
      }}>
      <SafeAreaView
        style={
          Platform.OS == 'android'
            ? SafeViewAndroid.AndroidSafeArea
            : backgroundStyle
        }>
        <StatusBar barStyle={'dark-content'} backgroundColor="#FFD2D2" />
        {/* <NavigationContainer>
          <Stack.Navigator screenOptions={{animation: 'none'}}>
            <Stack.Screen
              name="A1"
              component={A1StartPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="A2"
              component={A2SetTimer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="A3"
              component={A3QuestPage}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer> */}
        {currentAppState == 'Inactive' && <A1StartPage />}
        {currentAppState == 'Set Timer' && <A2SetTimer />}
        {currentAppState == 'Active In Progress' && <A3QuestPage />}
        {currentAppState == 'Active Game Over' && 'error'}
      </SafeAreaView>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
