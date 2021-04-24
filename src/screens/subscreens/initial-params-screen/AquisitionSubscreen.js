import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar, Text, useTheme } from 'react-native-paper'

export default props => {
    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Content title="Crie sua primeira carteira!" style={{ alignItems: 'center' }} />
            </Appbar.Header>
        </ScrollView>
    )
}