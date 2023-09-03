import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <NavigationContainer>
      <FlashMessage
        position="top"
        hideStatusBar={false}
        statusBarHeight={StatusBar.currentHeight}
      />
      <StatusBar backgroundColor={'#0ea5e9'} barStyle={'dark-content'} />
      <AuthStackNavigator />
    </NavigationContainer>
  );
}
