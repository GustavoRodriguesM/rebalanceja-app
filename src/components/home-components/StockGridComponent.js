import React from 'react'
import { Dimensions, StyleSheet, Text, View }  from 'react-native'
import { getPrimaryColor } from '../../styles/DefaultColors'
import BRLCurrencyFormat from '../../utils/BRLCurrencyFormat'

export default props => {
    const style = StyleSheet.create({
        component: {
            borderColor: '#5b5555',//props.bgColor,
            backgroundColor: '#5b5555',//'#161616',
            borderWidth: 1,
            marginTop: Dimensions.get("screen").width * 0.05,
            width: Dimensions.get("screen").width * 0.5,
            height: Dimensions.get("screen").height * 0.125,
            padding: 10,
            marginLeft: 20,
            borderRadius: 10,
            elevation: 4,
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
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16}}>
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

