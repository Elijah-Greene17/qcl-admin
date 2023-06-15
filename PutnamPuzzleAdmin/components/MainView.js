import {useContext} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {AppContext} from '../Contexts/AppContext';
import Button from './Button';
import Header from './Header';
import Timer from './Timer';

const MainView = ({children}) => {
  const {questNo} = useContext(AppContext);

  const backgroundStyle = {
    backgroundColor: '#FFD2D2',
    height: '100%',
    width: '100%',
  };

  return (
    <View style={backgroundStyle}>
      <Header code={questNo} />
      {children}
    </View>
  );
};

export default MainView;
