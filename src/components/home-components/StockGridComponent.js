import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View }  from 'react-native'

export default props => {
    const style = StyleSheet.create({
        component: {
            backgroundColor: props.bgColor,
            marginTop: Dimensions.get("screen").width * 0.05,
            width: Dimensions.get("screen").width * 0.5,
            height: Dimensions.get("screen").height * 0.125,
            padding: 10,
            marginLeft: 20,
            borderRadius: 10
        },
        TextStyle: {
            color: '#fff'
        },
        sideStats: {
            marginTop: Dimensions.get("screen").width * 0.05,
            flexDirection: 'row',
            justifyContent: "space-between",
        }
    })

    return (
        <View style={style.component}>
            <Text style={style.TextStyle}>
                {props.brStock ? 'Ações Brasileiras' : false}
                {props.extStock ? 'Ações Estrangeiras' : false}
                {props.reits ? 'REITs' : false}
                {props.brFiis ? 'FIIs' : false}
                {props.fixedIncome ? 'Renda Fixa' : false}
            </Text>
            <Text style={style.TextStyle}>R$ 50.000,00</Text>
            <View style={style.sideStats}>
                <Text style={style.TextStyle}>Atual: 20%</Text>
                <Text style={style.TextStyle}>Meta: 15%</Text>
            </View>
        </View>
    )
}

