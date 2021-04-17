import React, { Component } from 'react'
import { AuthService } from '../services/AuthService';
import { createStackNavigator } from '@react-navigation/stack';
import WalletSubscreen from './subscreens/stock-screen/WalletSubscreen';

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
            <Stack.Navigator
                initialRouteName="WalletSubscreen"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen 
                    name="WalletSubscreen" 
                    component={WalletSubscreen} />
                
            </Stack.Navigator>
        )
    }
}
