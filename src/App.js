import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './navigation/Tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';
import * as Font from 'expo-font';
import Auth from './components/auth-components/AuthComponent'
import SignUpScreen from './screens/SignUpScreen';
import InitialParamsScreen from './screens/InitialParamsScreen';
import RebalanceJaTheme from './utils/rebalanceJaTheme'

const Stack = createStackNavigator();

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
      <PaperProvider theme={RebalanceJaTheme}>
        <SafeAreaView style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="AuthScreen"
              screenOptions={{
                headerShown: false
              }}>
              <Stack.Screen name="AuthScreen" component={Auth} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="HomeScreen" component={Tabs} />
              <Stack.Screen name="InitialParamsScreen" component={InitialParamsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    )
  }
}