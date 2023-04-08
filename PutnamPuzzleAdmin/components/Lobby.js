import {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import Button from './Button';
import CustomCheckbox from './CustomCheckbox';
import Header from './Header';
import Timer from './Timer';

import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref} from 'firebase/database';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAYWnHYwXqH17hZbXIAT76bFgtN7gNyY7Q',
//   authDomain: 'quietcornerquests.firebaseapp.com',
//   projectId: 'quietcornerquests',
//   storageBucket: 'quietcornerquests.appspot.com',
//   messagingSenderId: '170321202795',
//   appId: '1:170321202795:web:ee95b6d259360368fc6b2e',
//   measurementId: 'G-0RJ6VZ0546',
// };

const Lobby = ({onSelect, users}) => {
  const [selectedPlayers, setSelectedPlayers] = useState({});

  const lobbyStyle = {
    height: '30%',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  useEffect(() => {
    console.log('Selected Players: ', selectedPlayers);
  }, [selectedPlayers]);

  return (
    <View style={lobbyStyle}>
      <ScrollView>
        {users &&
          users.map(user => (
            <Quester
              key={user.id}
              name={user.Name}
              number={user.Phone}
              onCheck={() => {
                // const obj = {}
                // obj[user.id] = {
                //   name: user.Name,
                //   phone: user.Phone
                // }
                const clone = {...selectedPlayers};
                clone[user.id] = {
                  Name: user.Name,
                  Phone: user.Phone,
                  id: user.id,
                };
                setSelectedPlayers(clone);
                onSelect(clone);
              }}
              onUncheck={() => {
                const clone = {...selectedPlayers};
                delete clone[user.id];
                setSelectedPlayers(clone);
                onSelect(clone);
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const Quester = ({name, number, onCheck, onUncheck}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      onCheck();
    } else {
      onUncheck();
    }
  }, [isSelected]);

  const questerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
  };

  const questerText = {
    fontSize: 20,
    marginRight: 20,
  };

  return (
    <View style={questerStyle}>
      <Text style={questerText}>{name}</Text>
      <View style={questerStyle}>
        <Text style={questerText}>{number}</Text>
        <CustomCheckbox
          handleCheck={() => {
            setIsSelected(true);
          }}
          handleUncheck={() => {
            setIsSelected(false);
          }}
        />
      </View>
    </View>
  );
};

export default Lobby;
