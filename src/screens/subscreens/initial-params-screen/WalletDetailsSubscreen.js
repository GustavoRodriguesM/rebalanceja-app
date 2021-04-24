import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { withTheme } from 'react-native-paper';

class WalletDetailsSubscreen extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Text>WalletDetailsSubscreen</Text>
        )
    }
}
export default withTheme(WalletDetailsSubscreen);