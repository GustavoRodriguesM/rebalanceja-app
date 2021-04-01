import React from 'react'
import { View, Text, StyleSheet }  from 'react-native'

export default props => {
    const style = StyleSheet.create({
        textoCentral: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.corFundo || '#000'
        },
        texto: {
            fontSize: 50,
            color: props.corTexto || '#fff'
        }
    })

    return (
        <View style={style.textoCentral}>
            <Text style={style.texto}>
                {props.children}
            </Text>
        </View>
    )
}

