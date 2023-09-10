import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const onAuthStateChanged = userInfo => {
    console.log('Auth state changed', userInfo);
    setCurrentUser(userInfo);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <FlashMessage
        position="top"
        hideStatusBar={false}
        statusBarHeight={StatusBar.currentHeight}
      />
      <StatusBar backgroundColor={'#0ea5e9'} barStyle={'dark-content'} />

      {currentUser?.uid ? <MainStackNavigator currentUser={currentUser} /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
