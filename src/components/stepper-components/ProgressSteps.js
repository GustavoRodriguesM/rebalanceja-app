import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export default props => {
    return (
        <View style={useTheme().styles.defaultBackgroundWithFlex}>
            {props.children[props.renderItem]}
        </View>
    )
}