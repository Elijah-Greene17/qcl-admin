import {View, Text, Image, Pressable, TextInput} from 'react-native';
import Button from '../components/Button';

import Timer from '../components/Timer';
import MainView from '../components/MainView';
import Spacer from '../components/Spacer';
import {useContext, useState} from 'react';
import {AppContext} from '../Contexts/AppContext';

import {firebaseConfig} from '../components/firebaseConfig';
import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';

const A2SetTimer = ({navigation}) => {
  const [hours, setHours] = useState('2');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  const {setTimeToSet} = useContext(AppContext);

  const handleSetDuration = () => {
    const hoursInMilliseconds = parseInt(hours) * 1000 * 3600;
    const minutesInMilliseconds = parseInt(minutes) * 1000 * 60;
    const secondsInMilliseconds = parseInt(seconds) * 1000;
    const totalSeconds =
      hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;
    setTimeToSet(totalSeconds);
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    set(ref(db, 'app/currentState'), 'Inactive');
  };

  // Styles
  const backgroundStyle = {
    backgroundColor: '#FFD2D2',
    height: '100%',
    width: '100%',
  };

  const inputSectionStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '5%',
  };

  const textInputStyle = {
    backgroundColor: '#fff',
    width: 80,
    height: 60,
    textAlign: 'center',
    fontSize: 28,
  };

  const colonStyle = {
    width: 20,
    fontSize: 28,
    height: 40,
    textAlign: 'center',
  };

  return (
    // Header: 25%; Timer: 15%, Button: 20%
    <MainView style={backgroundStyle}>
      <Spacer height="20%" />
      <View style={inputSectionStyle}>
        <TextInput
          style={textInputStyle}
          value={hours}
          onFocus={() => {
            setHours('');
          }}
          onChangeText={text => {
            setHours(text);
          }}
        />
        <Text style={colonStyle}>:</Text>
        <TextInput
          style={textInputStyle}
          value={minutes}
          onFocus={() => {
            setMinutes('');
          }}
          onChangeText={text => {
            setMinutes(text);
          }}
        />
        <Text style={colonStyle}>:</Text>
        <TextInput
          style={textInputStyle}
          value={seconds}
          onFocus={() => {
            setSeconds('');
          }}
          onChangeText={text => {
            setSeconds(text);
          }}
        />
      </View>
      <Spacer height="10%" />
      <Button onClick={handleSetDuration} title={'Set Quest Duration'} />
      <Button
        onClick={() => {
          // navigation.navigate('A1');
          // set app state to inactive
          const app = initializeApp(firebaseConfig);
          const db = getDatabase();
          set(ref(db, 'app/currentState'), 'Inactive');
        }}
        title={'Cancel'}
      />
    </MainView>
  );
};

export default A2SetTimer;
