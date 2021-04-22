import React, { Component } from 'react'
import { AuthService } from '../services/AuthService';
import { createStackNavigator } from '@react-navigation/stack';
import WalletSubscreen from './subscreens/stock-screen/WalletSubscreen';
import WalletConfigSubscreen from './subscreens/stock-screen/WalletConfigSubscreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default class InvestmentScreen extends Component {

    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }


    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            let hasTokenValid = await this.authService.hasTokenValid();
            if (!hasTokenValid) {
                await this.authService.loginViaRefreshToken();
            }
        });
    }

    render() {
        return (
            <NavigationContainer
                independent={true}>
                <Stack.Navigator
                    initialRouteName="WalletSubscreen"
                    screenOptions={{
                        headerShown: true
                    }}>
                    <Stack.Screen
                        name="WalletSubscreen"
                        component={WalletSubscreen} 
                        options={{headerShown: false}}
                        />
                    <Stack.Screen
                        name="WalletConfigSubscreen"
                        component={WalletConfigSubscreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
