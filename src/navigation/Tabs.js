import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dimensions, SafeAreaView, Text } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import HomeScreen from '../screens/HomeScreen'
import InvestmentScreen from '../screens/InvestmentScreen'
import StockScreen from '../screens/StockScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { getPrimaryColor } from '../styles/DefaultColors'
import { DefaultThemeColors } from '../styles/DefaultThemeColors'

const BottomTabs = createBottomTabNavigator();

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        this.defaultThemeColors = new DefaultThemeColors();
    }

    render() {
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

                        return <FontAwesome5 name={iconName} size={size} color={color} />;
                    },
                })}

                tabBarOptions={{
                    activeBackgroundColor: this.defaultThemeColors.getTabMenuColor(),
                    inactiveBackgroundColor: this.defaultThemeColors.getTabMenuColor(),
                    activeTintColor: '#fff',
                    inactiveTintColor: this.defaultThemeColors.getTabMenuInactiveColor(),
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
}