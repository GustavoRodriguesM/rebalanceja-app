import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './navigation/Tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import DefaultStyle from './styles/defaultStyle'
import Auth from './components/auth-components/AuthComponent';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <PaperProvider>
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
  );
}