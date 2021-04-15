import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import BRLCurrencyFormat from '../../utils/BRLCurrencyFormat'
import { getPrimaryColor } from '../../styles/DefaultColors'
import { Button } from 'react-native-elements'

export default props => {
    const style = StyleSheet.create({
        component: {
            backgroundColor: '#2e2e2e',
            marginBottom: Dimensions.get("screen").width * 0.05,
            marginTop: Dimensions.get("screen").width * 0.05,
            marginLeft: Dimensions.get("screen").width * 0.05,
            marginRight: Dimensions.get("screen").width * 0.05,
            borderRadius: 10
        },
        TextStyle: {
            color: '#fff'
        },
    })

    return (
        <View style={style.component}>
            <View style={{ 
                    flex: 1, 
                    backgroundColor: '#5b5555', 
                    borderTopLeftRadius: 10, 
                    borderTopRightRadius: 10, 
                    paddingTop: Dimensions.get("screen").width * 0.01, 
                    paddingBottom: Dimensions.get("screen").width * 0.01 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{ color: '#fff', marginLeft: Dimensions.get("screen").width * 0.03, fontWeight: 'bold' }}>
                        {props.gridName}
                    </Text>
                    <View style={{
                        backgroundColor: '#2e2e2e',
                        marginRight: Dimensions.get("screen").width * 0.10,
                        borderRadius: 10,
                        paddingLeft: Dimensions.get("screen").width * 0.02,
                        paddingRight: Dimensions.get("screen").width * 0.02,
                    }}>
                        <Text style={{ color: '#fff', fontSize: 14 }}>
                            {props.categoryDescription}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 3 }}>
                <View style={{ flexDirection: 'row', marginTop: Dimensions.get("screen").height * 0.01}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                            Aporte
                        </Text>
                        <Text style={style.TextStyle}>
                            R$ {BRLCurrencyFormat(props.buyValue)}
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                            Quantidade
                        </Text>
                        <Text style={style.TextStyle}>
                            {props.buyQuantity}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: Dimensions.get("screen").height * 0.01}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                            Diferença
                        </Text>
                        <Text style={style.TextStyle}>
                           {props.percentualDifference}%
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                            Preço
                        </Text>
                        <Text style={style.TextStyle}>
                            R$ {BRLCurrencyFormat(props.priceInBRL)}
                        </Text>
                    </View>
                </View>
                
            </View>
            <View style={{alignItems: 'center', marginTop: Dimensions.get("screen").height * 0.01, marginBottom: Dimensions.get("screen").height * 0.01}}>
                    <Button 
                        title="Aportar"
                        style={{width:  '60%'}}
                        buttonStyle={{backgroundColor: getPrimaryColor()}}
                    />
                </View>
        </View>
    )
}

