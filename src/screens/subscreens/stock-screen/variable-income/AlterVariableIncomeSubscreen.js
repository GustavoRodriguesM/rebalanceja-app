import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { Appbar, Button, Switch, TextInput, useTheme } from 'react-native-paper'
import ErrorMessage from '../../../../components/utils-components/ErrorMessage';
import { AquisitionService } from '../../../../services/AquisitionService';
import { StockService } from '../../../../services/StockService';
import Toast from 'react-native-toast-message';
import { convertCurrency } from '../../../../services/CommonService';
import CardStockPreVisualization from '../../../../components/stocks-components/CardStockPreVisualization';
import BRLCurrencyFormat from '../../../../utils/BRLCurrencyFormat';

export default props => {

    const [selectedStock, setSelectedStock] = useState()
    const [selectedQuantity, setSelectedQuantity] = useState(0)
    const [selectedWeight, setSelectedWeight] = useState(0)

    const [disabledButton, setDisabledButton] = useState(false)
    const [isAutomaticAllocate, setIsAutomaticAllocate] = useState(false)

    const { register, control, formState: { errors }, handleSubmit } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const onAlter = async (data) => {
        setDisabledButton(true)
        let obj = {
            idAquisition: props.route.params.alterAquisition.aquisition.idAquisition,
            isFixedIncome: false,
            weight: data.weightForm,
            quantity: data.quantityForm,
            priceFixedIncome: 0,
            maxPrice: isAutomaticAllocate ? data.maxPriceForm : 0
        }
        if (await new AquisitionService().updateAquisition(obj)) {
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Oba!',
                text2: 'O ativo ' + data.stockSymbolForm.toUpperCase() + ' foi alterado com sucesso!'
            });
        } else {
            setDisabledButton(false)
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Algo deu errado!',
                text2: 'Não foi possivel alterar o ativo ' + data.stockSymbolForm.toUpperCase() + '. Tente novamente!'
            });
        }
        props.navigation.goBack();
    }

    useEffect(() => {
        if (props.route.params.alterAquisition?.aquisition?.maxPrice > 0)
            setIsAutomaticAllocate(true);
    }, [])

    return (
        <>
            <View style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}>
                <Appbar.Header style={{ alignItems: 'center' }} >
                    <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                    <Appbar.Content
                        title={"Renda Variável"}
                        subtitle={"Alterando ".concat(props.route.params.alterAquisition.aquisition.stock.symbol)}
                    />
                    <Appbar.Action icon="check" onPress={handleSubmit(onAlter)} disabled={disabledButton} />

                </Appbar.Header>
                <ScrollView>
                    <View >
                        <View style={{ flex: 1, marginRight: Dimensions.get('screen').width * 0.1, marginLeft: Dimensions.get('screen').width * 0.1 }}>
                            <View style={{ marginTop: Dimensions.get('screen').height * 0.02 }}>
                                <Controller
                                    name="stockSymbolForm"
                                    control={control}
                                    defaultValue={props.route.params.alterAquisition.aquisition.stock.symbol}
                                    rules={{
                                        required: true,
                                        minLength: 0,
                                        maxLength: 20,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                        mode="flat"
                                        onBlur={onBlur}
                                        disabled={true}
                                        value={value}
                                        label="Nome do ativo"
                                        onChangeText={value => onChange(value)}
                                        style={{
                                            backgroundColor: '#262626'
                                        }}
                                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff', disabled: '#fff' } }}
                                    />)}
                                />
                                <ErrorMessage
                                    type={errors.stockSymbolForm?.type}
                                    error={errors.stockSymbolForm}
                                    minLength={0}
                                    maxLength={20}
                                />
                            </View>
                            <View style={{ marginTop: Dimensions.get('screen').height * 0.02 }}>
                                <Controller
                                    name="weightForm"
                                    control={control}
                                    defaultValue={props.route.params.alterAquisition.aquisition.weight.toString()}
                                    rules={{ required: true, min: 0, max: 100 }}
                                    render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                        keyboardType='number-pad'
                                        mode="flat"
                                        onBlur={onBlur}
                                        value={value}
                                        label="Peso do ativo"
                                        onChangeText={value => onChange(value)}
                                        style={{
                                            backgroundColor: '#262626'
                                        }}
                                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                    />)}
                                />
                                <ErrorMessage
                                    type={errors.weightForm?.type}
                                    error={errors.weightForm}
                                    minValue={0}
                                    maxValue={100} />
                            </View>
                            <View style={{ marginTop: Dimensions.get('screen').height * 0.02 }}>
                                <Controller
                                    name="quantityForm"
                                    control={control}
                                    defaultValue={props.route.params.alterAquisition.aquisition.quantity.toString()}
                                    rules={{ required: true, min: 0 }}
                                    render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                        keyboardType='number-pad'
                                        mode="flat"
                                        onBlur={onBlur}
                                        value={value}
                                        label="Ativos em custódia"
                                        onChangeText={value => onChange(value)}
                                        style={{
                                            backgroundColor: '#262626'
                                        }}
                                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                    />)}
                                />
                                <ErrorMessage
                                    type={errors.quantityForm?.type}
                                    error={errors.quantityForm}
                                    minValue={0} />
                            </View>
                            <View style={{
                                flex: 1,
                                alignItems: 'flex-start',
                                marginTop: Dimensions.get('screen').height * 0.02
                            }}>
                                <Text style={useTheme().styles.textStyle}>
                                    Controlar o aporte automaticamente?
                                    </Text>
                                <Switch
                                    value={isAutomaticAllocate}
                                    onValueChange={(value) => setIsAutomaticAllocate(value)}
                                    color={useTheme().colors.primary}
                                />
                            </View>
                            {isAutomaticAllocate &&
                                <View style={{ marginTop: Dimensions.get('screen').height * 0.02 }}>
                                    <Controller
                                        name="maxPriceForm"
                                        control={control}
                                        defaultValue={BRLCurrencyFormat(props.route.params.alterAquisition.aquisition.maxPrice)}
                                        rules={{ required: true, min: 0 }}
                                        render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                            keyboardType='number-pad'
                                            mode="flat"
                                            onBlur={onBlur}
                                            value={convertCurrency(value)}
                                            label="Preço máximo para aporte"
                                            onChangeText={value => onChange(convertCurrency(value))}
                                            style={{
                                                backgroundColor: '#262626'
                                            }}
                                            theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                        />)}
                                    />
                                    <ErrorMessage
                                        type={errors.maxPriceForm?.type}
                                        error={errors.maxPriceForm}
                                        minValue={0} />
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}