import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './navigation/Tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import DefaultStyle from './styles/defaultStyle'
import Auth from './components/auth-components/AuthComponent';
import HomeScreen from './screens/HomeScreen';


const Stack = createStackNavigator();


export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={DefaultStyle.containerWithFlex}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{
              headerShown: false
            }}>
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="HomeScreen" component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}