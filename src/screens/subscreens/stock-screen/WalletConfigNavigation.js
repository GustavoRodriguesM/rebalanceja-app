import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AquisitionConfigSubscreen from './AquisitionConfigSubscreen';
import WalletConfigSubscreen from './WalletConfigSubscreen';
import { useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default props => {

    return (
        <>
            <Tab.Navigator
                initialRouteName={"WalletConfigSubscreen"}
                tabBarOptions={{
                    activeTintColor: useTheme().colors.primary,
                    contentContainerStyle: {
                        backgroundColor: useTheme().colors.viewBackground
                    }
                }}>
                <Tab.Screen
                    name="WalletConfigSubscreen"
                    options={{ title: "Configurações gerais" }}
                    component={WalletConfigSubscreen}
                />
                <Tab.Screen 
                    name="AquisitionConfigSubscreen"
                    options={{ title: "Ativos" }} 
                    component={AquisitionConfigSubscreen} 
                />
            </Tab.Navigator>
        </>
    );
}