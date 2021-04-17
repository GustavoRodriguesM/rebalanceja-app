import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './navigation/Tabs';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import DefaultStyle from './styles/defaultStyle'
import Auth from './components/auth-components/AuthComponent';
import { LogBox } from 'react-native';
import * as Font from 'expo-font';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  dark: true,
  colors: {
    primary: '#CF3341',
    viewBackground: '#161616',
    inactivated: '#5b5555',
    divider: '#5b5555',
    viewBackgroundSecundary: '#5b5555',
    text: '#fff',
    textInputBackground: '#262626',
    homeScreenChart: {
      backgroundGradientFrom: '#4A4A4A',
      backgroundGradientTo: '#5b5555'
    },
    tabsMenu: {
      active: '#161616',
      inactive: '#161616',
      inactiveTintColor: '#5b5555'
    }
  }
};

export default class App extends Component {

  componentDidMount() {
    LogBox.ignoreAllLogs();
    Font.loadAsync({
      //'Montserrat-Regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
      //'Montserrat-Bold': require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
      'Roboto-Regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
      'Roboto-Bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    });
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <SafeAreaView style={DefaultStyle.containerWithFlex}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="AuthScreen"
              screenOptions={{
                headerShown: false
              }}>
              <Stack.Screen name="AuthScreen" component={Auth} />
              <Stack.Screen name="HomeScreen" component={Tabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    )
  }
}