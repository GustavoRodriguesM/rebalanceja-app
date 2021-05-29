import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './navigation/Tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';
import * as Font from 'expo-font';
import SignUpScreen from './screens/SignUpScreen';
import InitialParamsScreen from './screens/InitialParamsScreen';
import RebalanceJaTheme from './utils/rebalanceJaTheme'
import AuthScreen from './screens/AuthScreen';
import Toast, { BaseToast } from 'react-native-toast-message';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import InternetConnectionAlert from "react-native-internet-connection-alert";
import { AuthService } from './services/AuthService';

const Stack = createStackNavigator();

const toastConfig = {
  success: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      text1Style={{
        color: RebalanceJaTheme.colors.primary,
      }}
      text2Style={{
        fontSize: 11,
      }}
      trailingIcon={null}
      style={{ backgroundColor: RebalanceJaTheme.colors.modalBackground }}
      contentContainerStyle={{ backgroundColor: RebalanceJaTheme.colors.modalBackground, marginLeft: Dimensions.get('screen').width * 0.1 }}
      text1={text1}
      text2={text2}
    />
  ),
  error: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      text1Style={{ color: RebalanceJaTheme.colors.error }}
      text2Style={{
        fontSize: 11,
      }}
      trailingIcon={null}
      style={{ backgroundColor: RebalanceJaTheme.colors.modalBackground }}
      contentContainerStyle={{ backgroundColor: RebalanceJaTheme.colors.modalBackground, marginLeft: Dimensions.get('screen').width * 0.1 }}
      text1={text1}
      text2={text2}
    />
  ),
};

export default props => {

  const [notification, setNotification] = useState();

  useEffect(() => {
    LogBox.ignoreAllLogs();
    Font.loadAsync({
      //'Montserrat-Regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
      //'Montserrat-Bold': require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
      'Inter-Regular': require('../assets/fonts/Inter/Inter-Regular.ttf'),
      'Inter-Bold': require('../assets/fonts/Inter/Inter-Bold.ttf'),
    });
  }, [])

  return (
    <PaperProvider theme={RebalanceJaTheme}>
      <InternetConnectionAlert
        title={"Opa!"}
        message={"Parece que você está sem internet. O app pode apresentar problemas."}
        onChange={(connectionState) => {
          console.log("Connection State: ", connectionState);
        }}
      >
        <SafeAreaView style={{
          flex: 0, //backgroundColor: RebalanceJaTheme.colors.viewBackground ,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }} />
        <SafeAreaView style={{
          flex: 1,
        }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="AuthScreen"
              screenOptions={{
                headerShown: false
              }}>
              <Stack.Screen name="AuthScreen" component={AuthScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="HomeScreen" component={Tabs} />
              <Stack.Screen name="InitialParamsScreen" component={InitialParamsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>

        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </InternetConnectionAlert>
    </PaperProvider>
  )
}