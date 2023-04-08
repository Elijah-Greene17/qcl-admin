import {View, Text, Pressable} from 'react-native';

const SubButton = ({title, onClick}) => {
  const container = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '5%',
    marginTop: '3%',
  };

  const buttonBorder = {
    backgroundColor: 'black',
    width: '20%',
    borderRadius: 2,
    padding: 5,
  };

  const button = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    backgroundColor: 'pink',
    height: '100%',
    width: '100%',
    borderRadius: 2,
  };

  const buttonText = {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  };

  return (
    <View style={container}>
      <Pressable style={buttonBorder} onPress={onClick}>
        <View style={button}>
          <Text style={buttonText}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SubButton;
