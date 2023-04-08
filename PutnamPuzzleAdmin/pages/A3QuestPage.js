import {View, Text, Image, Pressable, TextInput} from 'react-native';
import Button from '../components/Button';
import SubButton from '../components/SubButton';

import Timer from '../components/Timer';
import MainView from '../components/MainView';
import Spacer from '../components/Spacer';
import {useContext, useState} from 'react';
import {AppContext} from '../Contexts/AppContext';
import Lobby from '../components/Lobby';

import {firebaseConfig} from '../components/firebaseConfig';

const A3QuestPage = ({navigation}) => {
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

  return (
    <MainView style={backgroundStyle}>
      {/* <Timer isRunning={timerIsRunning} startTime={timerSetting} /> */}
      <Lobby
        onSelect={() => {
          console.log('Player Selected');
        }}
        users={users}
      />
      <Text style={hintStyle}>Elijah Has Requested a Hint</Text>
      <SubButton
        title={'Clear'}
        onClick={() => {
          console.log('ButtonClicked');
        }}
      />
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
