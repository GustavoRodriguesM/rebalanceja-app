import React, { useEffect } from 'react'
import { AuthService } from '../services/AuthService';
import ProfileSubscreen from './subscreens/profile-screen/ProfileSubscreen';
import { createStackNavigator } from '@react-navigation/stack';
import WalletSubscreen from './subscreens/profile-screen/wallet-submenu/WalletSubscreen';
import WalletConfigSubscreen from './subscreens/profile-screen/wallet-submenu/WalletConfigSubscreen';

const Stack = createStackNavigator();

export default props => {

    useEffect(() => {
        props.navigation.addListener('focus', async () => {
            let hasTokenValid = await new AuthService().hasTokenValid();
            if (!hasTokenValid) {
                await new AuthService().loginViaRefreshToken();
            }

        });
    }, [])


    return (
        <Stack.Navigator
            initialRouteName="ProfileSubscreen"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen
                name="ProfileSubscreen"
                component={ProfileSubscreen} />
            <Stack.Screen
                name="WalletSubscreen"
                component={WalletSubscreen} />
            <Stack.Screen
                name="WalletConfigSubscreen"
                component={WalletConfigSubscreen} />

        </Stack.Navigator>
    )
}
