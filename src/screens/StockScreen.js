import React, { useEffect, useState } from 'react'
import { AuthService } from '../services/AuthService';
import WalletConfigNavigation from './subscreens/stock-screen/WalletConfigNavigation';
import { Appbar } from 'react-native-paper';
import { WalletService } from '../services/WalletService';

export default props => {

    const [description, setDescription] = useState("")

    useEffect(() => {
        async function fetchMyAPI() {
            let authService = new AuthService();
            let hasTokenValid = await authService.hasTokenValid();
            if (!hasTokenValid) {
                await authService.loginViaRefreshToken();
            }
            
            let walletLocal = await new WalletService().getActiveWallet();
            setDescription(walletLocal.description)
        }

        fetchMyAPI()
    }, []);

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title={description} subtitle={"Alterando carteira"} style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <WalletConfigNavigation />
        </>
    )
}

/*
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
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="WalletConfigNavigation"
                        {...props}
                        options={{
                            header: ({ scene, previous, navigation }) => {
                                return (
                                    <Appbar.Header>
                                        <Appbar.Content title={scene.route.params.description} subtitle={"Alterando carteira"} style={{ alignItems: 'center' }} />
                                    </Appbar.Header>
                                );
                            }
                        }}
                        component={WalletConfigNavigation} />
                </Stack.Navigator>
            </NavigationContainer>
*/