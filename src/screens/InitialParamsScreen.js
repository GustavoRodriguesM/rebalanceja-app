import React, { useState } from 'react'
import WalletDetailsComponent from '../components/initial-params-components/WalletDetailsComponent';
import { View } from 'react-native';
import ProgressSteps from '../components/stepper-components/ProgressSteps';
import ProgressStep from '../components/stepper-components/ProgressStep';
import { useTheme } from 'react-native-paper';
import AquisitionListSubscreen from './subscreens/initial-params-screen/AquisitionListSubscreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'


const Stack = createStackNavigator();

export default props => {

    const [stepNumber, setStepNumber] = useState(1);

    const nextScreen = () => {
        setStepNumber(stepNumber + 1);
    }

    return (
        <View style={useTheme().styles.defaultBackgroundWithFlex}>
            <ProgressSteps
                renderItem={stepNumber - 1}>
                <ProgressStep >
                    <WalletDetailsComponent
                        goNext={() => nextScreen()} />
                </ProgressStep>
                <ProgressStep >
                    <AquisitionListSubscreen onGoBack={() => props.navigation.goBack()}/>
                </ProgressStep>
            </ProgressSteps>
        </View>
    )
}