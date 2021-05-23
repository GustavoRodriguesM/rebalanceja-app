import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { Card, Divider, Paragraph, Text, useTheme } from 'react-native-paper'
import { Stock } from '../../models/Stock'
import { StockService } from '../../services/StockService'
import BRLCurrencyFormat from "../../utils/BRLCurrencyFormat";

export default props => {

    const textStyle = useTheme().styles.textStyle;
    const textStylePrimary = useTheme().styles.textStylePrimary
    const subtextStyle = useTheme().styles.subtextStyle
    const [stock, setStock] = useState()

    useEffect(() => {
        findStockBySymbol = async () => {
            let obj: Stock = await new StockService().findBySymbol(props.stockSymbol);
            setStock(obj);
        }

        findStockBySymbol();
    }, [props.stockSymbol])

    const getCardStyle = () => {
        let cardStyle = []
        if (props.indexKey === props.lengthList - 1)
            cardStyle = {
                width: Dimensions.get('screen').width * 0.8,
                marginLeft: Dimensions.get('screen').width * 0.1,
                marginRight: Dimensions.get('screen').width * 0.1,
                marginBottom: Dimensions.get('screen').height * 0.15
            }
        else {
            cardStyle = {
                width: Dimensions.get('screen').width * 0.8,
                marginLeft: Dimensions.get('screen').width * 0.1,
                marginRight: Dimensions.get('screen').width * 0.1,
            }
        }
        return cardStyle;
    }

    if (stock != undefined) {
        return (
            <>
                <Card key={props.indexKey} style={getCardStyle()}>
                    <Card.Title
                        title={stock?.symbol}
                        titleStyle={[textStylePrimary, { fontWeight: 'bold' }]}
                        subtitleNumberOfLines={5}
                        subtitle={stock?.longName + "\n" + stock?.category.description}
                        subtitleStyle={subtextStyle} />
                    <Card.Content>
                        {stock?.category.idCategory != 5 &&
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'baseline',
                                    justifyContent: 'space-between'
                                }}>
                                <Paragraph style={textStyle}>Preço unitário</Paragraph>
                                <Paragraph style={textStyle}>{"R$ " + BRLCurrencyFormat(stock?.priceInBRL)}</Paragraph>
                            </View>
                        }
                        {(stock?.category.idCategory == 3 || stock?.category.idCategory == 4 || stock?.category.idCategory == 6) &&
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'baseline',
                                    justifyContent: 'space-between'
                                }}>
                                <Paragraph style={textStyle}>Preço local</Paragraph>
                                <Paragraph style={textStyle}>{stock?.currency + " " + BRLCurrencyFormat(stock?.price)}</Paragraph>
                            </View>
                        }
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                                justifyContent: 'space-between'
                            }}>
                            <Paragraph style={textStyle}>Posição</Paragraph>

                            <Paragraph style={textStyle}>{"R$ " + BRLCurrencyFormat(stock?.priceInBRL * props.selectedQuantity)}</Paragraph>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                                justifyContent: 'space-between'
                            }}>
                            <Paragraph style={textStyle}>Quantidade</Paragraph>
                            <Paragraph style={textStyle}>{props.selectedQuantity}</Paragraph>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                                justifyContent: 'space-between'
                            }}>
                            <Paragraph style={textStyle}>Peso</Paragraph>
                            <Paragraph style={textStyle}>{props.selectedWeight}</Paragraph>
                        </View>
                    </Card.Content>
                </Card>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}