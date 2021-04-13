import React from 'react'
import { Dimensions, StyleSheet, Text, View }  from 'react-native'
import BRLCurrencyFormat from '../../utils/BRLCurrencyFormat'

export default props => {
    const style = StyleSheet.create({
        component: {
            borderColor: props.bgColor,
            borderWidth: 1,
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
                {props.gridName}
            </Text>
            <Text style={style.TextStyle}>
                R$ {BRLCurrencyFormat(props.totalInvestment)}
            </Text>
            <View style={style.sideStats}>
                <Text style={style.TextStyle}>Atual: {props.actual || 0}%</Text>
                <Text style={style.TextStyle}>Meta: {props.objective || 0}%</Text>
            </View>
        </View>
    )
}

