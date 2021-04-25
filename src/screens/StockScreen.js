import React, { useCallback, useEffect, useState } from 'react'
import { AuthService } from '../services/AuthService';
import WalletConfigNavigation from './subscreens/stock-screen/WalletConfigNavigation';
import { Appbar } from 'react-native-paper';
import { WalletService } from '../services/WalletService';
import { useFocusEffect } from '@react-navigation/core';
import AquisitionConfigSubscreen from './subscreens/stock-screen/AquisitionConfigSubscreen';

export default props => {

    const [description, setDescription] = useState("")

    useEffect(() => {

        fetchMyAPI()
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchMyAPI()
        }, [])
    );


    const  fetchMyAPI = async () => {
        let authService = new AuthService();
        let hasTokenValid = await authService.hasTokenValid();
        if (!hasTokenValid) {
            await authService.loginViaRefreshToken();
        }
        
        let walletLocal = await new WalletService().getActiveWallet();
        setDescription(walletLocal.description)
    }


    return (
        <>
            <AquisitionConfigSubscreen />
        </>
    )
}
