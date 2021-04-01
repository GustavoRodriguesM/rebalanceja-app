import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View }  from 'react-native'

export default props => {
    return (
        <View style={style.component}>
            <Text style={style.userName}>Olá, {props.name}</Text>
            <Text style={style.TextStyle}>Bem vindo!</Text>
        </View>
    )
}

const style = StyleSheet.create({
    TextStyle: {
        color: '#fff'
    },
    userName: {
        fontSize: 16,
        color: '#fff'
    },
    component: {
        paddingTop: Dimensions.get("screen").width * 0.05,
        paddingLeft: Dimensions.get("screen").width * 0.05
    }
})