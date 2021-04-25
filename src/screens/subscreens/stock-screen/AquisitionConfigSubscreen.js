import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import { Card, Divider, FAB, Paragraph, Portal, useTheme, Provider, Button, Appbar } from 'react-native-paper'
import { WalletService } from '../../../services/WalletService'
import BRLCurrencyFormat from './../../../utils/BRLCurrencyFormat'

export default props => {

    const [aquisitions, setAquisitions] = useState([])

    /* FAB */
    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;
    /* FAB */


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
                    <Card.Title title={obj.stock.symbol} titleStyle={{ color: colorPrimary }} subtitle={obj.stock.category.description} />
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
                        <Divider style={{
                            backgroundColor: colorPrimary,
                            marginTop: Dimensions.get('screen').height * 0.02,
                            opacity: 0.3
                        }} />
                    </Card.Content>
                </Card>
            )
        })

        return components;
    }

    return (
        <View style={{ backgroundColor: useTheme().colors.viewBackground }}>
            <Appbar.Header>
                <Appbar.Content title={description} subtitle={"Alterando carteira"} style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <ScrollView>
                <Paragraph>Adicione seus ativos aqui!</Paragraph>
                <Paragraph>Qualquer ação é salva automaticamente</Paragraph>
                <View style={{ alignItems: 'center' }}>
                    <Button mode="contained"
                        style={{
                            backgroundColor: useTheme().colors.primary,
                            width: '50%'
                        }}
                    >Adicionar</Button>
                </View>
                <View >
                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                        {getStockListCard()}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}