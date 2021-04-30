import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { Appbar, Button, TextInput, useTheme } from 'react-native-paper'
import ErrorMessage from '../../../components/utils-components/ErrorMessage';
import { AquisitionService } from '../../../services/AquisitionService';
import { StockService } from '../../../services/StockService';

export default props => {

    const[stockSymbolOriginal, setStockSymbolOriginal] = useState("");

    const { register, control, formState: { errors }, handleSubmit } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const onSubmit = async (data) => {
        let obj = {
            stockSymbolOriginal: data.stockSymbolForm,
            isFixedIncome: false,
            weight: data.weightForm,
            quantity: data.quantityForm,
            priceFixedIncome: 0
        }
        await new AquisitionService().createAquisition(obj);

        props.navigation.goBack();
    }

    return (
        <>
            <View style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}>
                <ScrollView>
                    <Appbar.Header style={{ alignItems: 'center' }} >
                        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                        <Appbar.Content 
                            title={"Renda Variável"} 
                            subtitle={"Adicionando"} 
                        />
                    </Appbar.Header>
                    <View >
                        <View style={{ flex: 1, marginRight: Dimensions.get('screen').width * 0.1, marginLeft: Dimensions.get('screen').width * 0.1 }}>
                            <View style={{ marginTop: Dimensions.get('screen').height * 0.02 }}>
                                <Controller
                                    name="stockSymbolForm"
                                    control={control}
                                    rules={{
                                        required: true,
                                        minLength: 0,
                                        maxLength: 20,
                                        validate: {
                                            withoutSpace: (value) => { return !value.includes(" ") },
                                            duplicateStock: async (value) => { 
                                                let data = {
                                                    idWallet: props.route.params.idWallet,
                                                    stockSymbolOriginal: value
                                                }
                                                return await new StockService().existsInActiveWallet(data);
                                            },
                                            existsStock: async (value) => { 
                                                let stock = await new StockService().findBySymbol(value);
                                                return (stock != null);
                                            }
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                        mode="flat"
                                        onBlur={onBlur}
                                        value={value}
                                        label="Nome do ativo"
                                        onChangeText={value => onChange(value)}
                                        style={{
                                            backgroundColor: '#262626'
                                        }}
                                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
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
                                    defaultValue="0"
                                    rules={{ required: true, min: 0 }}
                                    render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                        keyboardType='number-pad'
                                        mode="flat"
                                        onBlur={onBlur}
                                        value={value}
                                        label="Já possui quantos ativos em custódia?"
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
                        </View>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <Button
                                mode="contained"
                                style={{
                                    backgroundColor: useTheme().colors.primary,
                                    marginTop: Dimensions.get('screen').height * 0.02,
                                    width: '50%'
                                }}
                                onPress={handleSubmit(onSubmit)}>
                                Cadastrar
                        </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}