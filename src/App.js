import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Tabs from './navigation/Tabs';
import DefaultStyle from './styles/defaultStyle'

export default function App() {
  return (
    <SafeAreaView style={DefaultStyle.containerWithFlex}>
      <NavigationContainer>
        <Tabs/>
      </NavigationContainer>
    </SafeAreaView>
  );
}