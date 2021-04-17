import React from 'react'
import { Dimensions, StyleSheet, Text, View }  from 'react-native'
import BRLCurrencyFormat from '../../utils/BRLCurrencyFormat'
import { useTheme  } from 'react-native-paper';

export default props => {
      
    const style = StyleSheet.create({
        component: {
            marginTop: Dimensions.get("screen").width * 0.05,
            width: Dimensions.get("screen").width * 0.8,
            height: Dimensions.get("screen").height * 0.1,
            padding: 10,
            marginLeft: Dimensions.get("screen").width * 0.1,
            marginRight: Dimensions.get("screen").width * 0.1,
            borderRadius: 10
        },
        centerComponent:{ 
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        TextStyle: {
            color: useTheme().colors.primary // ffc70e
        },
        totalInvestments: {
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
        },
        sideStats: {
            marginTop: Dimensions.get("screen").width * 0.01,
            flexDirection: 'row',
            justifyContent: "space-between",
        }
    })

    return (
        <View style={style.component}>
            <View style={style.centerComponent}>
                <Text style={style.totalInvestments}>
                    R$ {BRLCurrencyFormat(props.totalInvestments)}
                </Text>
                <View style={style.sideStats}>
                    <Text style={style.TextStyle}>Total em investimentos</Text>
                </View>
            </View>
        </View>
    )
}

