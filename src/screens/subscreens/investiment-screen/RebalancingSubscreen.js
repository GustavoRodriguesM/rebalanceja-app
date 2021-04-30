import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Keyboard, Text, View, ScrollView } from 'react-native'
import { Appbar, Button, TextInput, useTheme } from 'react-native-paper';
import { RebalancingService } from '../../../services/RebalancingService';
import { AuthService } from '../../../services/AuthService';
import AquisitionSupportComponent from '../../../components/investment-components/AquisitionSupportComponent';
import SnackBar from 'react-native-snackbar-component'

export default props => {

    const [aquisitionsSupports, setAquisitionsSupports] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [financialSupport, setFinancialSupport] = useState("0")
    const [showSnackbar, setShowSnackbar] = useState(false)

    useEffect(() => {
        async function fetchMyAPI() {
            props.navigation.addListener('focus', async () => {
                let hasTokenValid = await new AuthService().hasTokenValid();
                if (!hasTokenValid) {
                    await new AuthService().loginViaRefreshToken();
                }
                if (financialSupport > 0) {
                    await rebalanceStocks();
                }
            });


        }
        fetchMyAPI()
    }, []);

    useEffect(() => {
        async function dismissSnackbar() {
            if (showSnackbar) {
                setTimeout(
                    () => {
                        setShowSnackbar(false)
                    },
                    3000)
            }
        }
        dismissSnackbar()
    }, [showSnackbar]);


    const rebalanceStocks = async () => {
        setIsLoading(true)
        Keyboard.dismiss()
        let responseList = await new RebalancingService().rebalance(financialSupport);
        setAquisitionsSupports(responseList)

        if (responseList === 'undefined' || responseList.length === 0) {
            setShowSnackbar(true)
        }
        setIsLoading(false)
    }

    const onRegister = async (buyValue, isBuyOperation) => {
        if (isBuyOperation) {
            if (Number(financialSupport) - buyValue <= 0)
                setFinancialSupport("0");
            else
                setFinancialSupport((Number(financialSupport) - buyValue).toFixed(2));
        } else {
            setFinancialSupport((Number(financialSupport) + Number(buyValue)).toFixed(2));
        }
    }

    const renderItemAquisition = () => {
        let components = []
        aquisitionsSupports.forEach((element, index) => {
            components.push(<AquisitionSupportComponent
                key={index}
                gridName={element.aquisitionQuoteDTO.stock.symbol}
                categoryDescription={element.aquisitionQuoteDTO.stock.category.description}
                categoryColor={element.aquisitionQuoteDTO.stock.category.defaultColor}
                buyValue={element.buyValue}
                buyQuantity={element.buyQuantity}
                priceInBRL={element.aquisitionQuoteDTO.stock.priceInBRL}
                percentualDifference={element.percentualDifferenceOriginal}
                onPressAquisitionSupport={() => {
                    props.navigation.navigate('FinancialSupportSubscreen', { aquisition: element, onRegister: onRegister });
                }}

            />)
        });

        return components;
    }

    return (
        <>
            <SnackBar visible={showSnackbar} textMessage="Nenhum aporte necessário por enquanto!" actionHandler={() => { setShowSnackbar(false) }} actionText="Fechar" />
            <View style={useTheme().styles.defaultBackgroundWithFlex}>
                <ScrollView>
                    <Appbar.Header>
                        <Appbar.Content title={"Rebalanceamento"} style={{ alignItems: 'center' }} />
                    </Appbar.Header>
                    <Text style={{
                        marginLeft: Dimensions.get("screen").width * 0.05,
                        marginTop: Dimensions.get("screen").width * 0.05,
                        fontSize: 16,
                        color: useTheme().colors.text
                    }}>Rebalanceamento de ativos</Text>
                    <View style={{ margin: Dimensions.get("screen").width * 0.05 }}>
                        <TextInput
                            label="Aporte"
                            mode="flat"
                            keyboardType='decimal-pad'
                            value={financialSupport.toString()}
                            style={{ backgroundColor: useTheme().colors.textInputBackground, marginBottom: 10 }}
                            theme={{ colors: { text: useTheme().colors.text, placeholder: useTheme().colors.text, primary: useTheme().colors.text } }}
                            onChangeText={financialSupport => setFinancialSupport(financialSupport)} />
                        <Button mode="contained"
                            loading={isLoading}
                            style={{ backgroundColor: useTheme().colors.primary }}
                            onPress={rebalanceStocks}>
                            Calcular aportes
                        </Button>
                    </View>
                    <View>
                        {renderItemAquisition()}
                    </View>
                </ScrollView>
            </View>
        </>
    )
}