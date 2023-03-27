import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

const CustomCheckbox = ({ handleCheck, handleUncheck }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      handleCheck()
    } else {
      handleUncheck()
    }
  }, [isChecked])

  return (
    <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
      <View
        style={{
          height: 20,
          width: 20,
          borderWidth: 1,
          borderColor: '#555',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 4,
        }}>
        {isChecked && (
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: '#555',
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
