import React, { Component } from 'react'
import { AuthService } from '../services/AuthService';
import { DefaultThemeColors } from '../styles/DefaultThemeColors';
import RebalancingSubscreen from './subscreens/RebalancingSubscreen';
import FinancialSupportSubscreen from './subscreens/FinancialSupportSubscreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class InvestmentScreen extends Component {

    constructor(props) {
        super(props);
        this.defaultThemeColors = new DefaultThemeColors();
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
                initialRouteName="RebalancingSubscreen"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen 
                    name="RebalancingSubscreen" 
                    component={RebalancingSubscreen} />
                <Stack.Screen name="FinancialSupportSubscreen" component={FinancialSupportSubscreen} />
            </Stack.Navigator>
        )
    }
}
