import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './navigation/Tabs';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';
import * as Font from 'expo-font';
import Auth from './components/auth-components/AuthComponent'
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

const FONTFAMILY = "Roboto"
const PRIMARY = "#fed139"

const customColors = {
  primary: PRIMARY,//'#CF3341',//ed651b
  viewBackground: '#161616',
  inactivated: '#5b5555',
  divider: '#5b5555',
  viewBackgroundSecundary: '#5b5555',
  viewCardBackground: '#262626',
  text: '#fff',
  textInputBackground: '#262626',
  modalBackground: '#262626',
  button: {
    background: PRIMARY,
    text: "#000"
  },
  homeScreenChart: {
    backgroundGradientFrom: '#4A4A4A',
    backgroundGradientTo: '#5b5555'
  },
  tabsMenu: {
    active: '#161616',
    inactive: '#161616',
    inactiveTintColor: '#5b5555'
  },
  signUpScreen: {
    recommendedButtonBackground: '#312f2b'
  }
};

const customStyles = {
  defaultView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  defaultBackgroundWithFlex:  {
    backgroundColor: customColors.viewBackground,
    flex: 1,
  },
  textStyle: {
    color: customColors.text,
    fontFamily: FONTFAMILY.concat('-Regular')
  },
  stocksScreen: {
    headerTextBold: {
      color: customColors.text,
      fontSize: 24,  
      fontFamily: FONTFAMILY.concat('-Bold')
    },
  }
};

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: customColors,
  styles: customStyles
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
              {/*<Stack.Screen name="AuthScreen" component={Auth} /> */}
              <Stack.Screen name="AuthScreen" component={Auth} /> 
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="HomeScreen" component={Tabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    )
  }
}