import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import { Card, FAB, Paragraph,  useTheme } from 'react-native-paper'
import { AsyncStorageService } from '../../../services/AsyncStorageService'
import { WalletService } from '../../../services/WalletService'
import BRLCurrencyFormat from './../../../utils/BRLCurrencyFormat'

export default props => {

    const [aquisitions, setAquisitions] = useState([])

    useEffect(() => {
        async function fetchMyAPI() {
            let walletLocal = await new WalletService().getActiveWallet();
            let walletStocks = await new WalletService().getAquisitionsByWallet(walletLocal.idWallet);

            setAquisitions(walletStocks)
        }
        fetchMyAPI()
    }, []);


    const getStockListCard = () => {
        let components = [];
        let colorPrimary = useTheme().colors.primary

        aquisitions.forEach((obj, index) => {
            components.push(
                <Card key={index} style={{
                    width: Dimensions.get('screen').width * 0.8,
                    marginLeft: Dimensions.get('screen').width * 0.1,
                    marginRight: Dimensions.get('screen').width * 0.1
                }}
                    onLongPress={() => console.log("LongPress")}>
                    <Card.Title title={obj.stock.symbol} titleStyle={{color: colorPrimary}} subtitle={obj.stock.category.description} />
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                                justifyContent: 'space-between'
                            }}>
                            <Paragraph>Preço unitário</Paragraph>
                            <Paragraph>{"R$" + BRLCurrencyFormat(obj.stock.price)}</Paragraph>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                                justifyContent: 'space-between'
                            }}>
                            <Paragraph>Quantidade</Paragraph>
                            <Paragraph>{obj.quantity}</Paragraph>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                                justifyContent: 'space-between'
                            }}>
                            <Paragraph>Peso</Paragraph>
                            <Paragraph>{obj.weight}</Paragraph>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                                justifyContent: 'space-between'
                            }}>
                            <Paragraph>Aportar</Paragraph>
                        </View>
                    </Card.Content>
                </Card>
            )
        })

        return components;
    }

    return (
        <>
            <ScrollView style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}>
                <View >
                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                        {getStockListCard()}
                    </View>
                </View>
            </ScrollView>

            <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 0,
                    backgroundColor: useTheme().colors.primary
                }}
                small={false}
                icon="plus"
                onPress={() => console.log("clicou")}
            />
        </>
    )
}