import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dimensions, SafeAreaView, Text } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import HomeScreen from '../screens/HomeScreen'
import InvestmentScreen from '../screens/InvestmentScreen'
import StockScreen from '../screens/StockScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { getPrimaryColor } from '../styles/DefaultColors'

const BottomTabs = createBottomTabNavigator();

export default props => {
    return (
        <BottomTabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'HomeScreen':
                            iconName = 'home';
                            break;
                        case 'InvestmentScreen':
                            iconName = 'wallet';
                            break;
                        case 'StockScreen':
                            iconName = 'dollar-sign';
                            break;
                        case 'ProfileScreen':
                            iconName = 'user'
                            break;
                    }



                    // You can return any component that you like here!
                    return <FontAwesome5 name={iconName} size={size} color={color} />;
                },
            })}

            tabBarOptions={{
                activeBackgroundColor: '#161616',
                inactiveBackgroundColor: '#161616',
                activeTintColor: '#fff',
                inactiveTintColor: '#5b5555',
                showLabel: true,
                labelStyle: {
                    marginBottom: 5,
                },
                style: {
                    height: Dimensions.get("screen").height * 0.07
                }
            }}>
            <BottomTabs.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Início' }} />
            <BottomTabs.Screen name="InvestmentScreen" component={InvestmentScreen} options={{ title: 'Investimentos' }} />
            <BottomTabs.Screen name="StockScreen" component={StockScreen} options={{ title: 'Ativos' }} />
            <BottomTabs.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Perfil' }} />
        </BottomTabs.Navigator>
    )
}