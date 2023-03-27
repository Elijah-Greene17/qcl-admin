/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform
} from 'react-native';

import MainView from './components/MainView';
import SafeViewAndroid from "./components/SafeViewAndroid";
import { AppContext } from './Contexts/AppContext';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import A1StartPage from './pages/A1StartPage';
import A2SetTimer from './pages/A2SetTimer';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {

  const [timerIsRunning, setTimerIsRunning] = useState(false)
  const [timerSetting, setTimer] = useState(0)

  const backgroundStyle = {
    backgroundColor: "#FFD2D2",

    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,

    //flex: 1,
    // top: Platform.OS === "android" ? (StatusBar.currentHeight : 0,
    //backgroundColor: Platform.OS === "android" ? 'red' : 'blue'
  };

  return (
    <AppContext.Provider
      value={{
        timerIsRunning,
        setTimerIsRunning,
        timerSetting,
        setTimer
      }}>
      <SafeAreaView style={Platform.OS == 'android' ? SafeViewAndroid.AndroidSafeArea : backgroundStyle}>
        <StatusBar barStyle={'dark-content'} backgroundColor="#FFD2D2" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ animation: 'none' }}>
            <Stack.Screen
              name="A1"
              component={A1StartPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="A2"
              component={A2SetTimer}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
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
