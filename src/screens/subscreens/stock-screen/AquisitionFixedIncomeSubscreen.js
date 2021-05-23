import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { Appbar, Button, TextInput, useTheme } from 'react-native-paper'
import ErrorMessage from '../../../components/utils-components/ErrorMessage';
import { AquisitionService } from '../../../services/AquisitionService';
import { StockService } from '../../../services/StockService';
import Toast from 'react-native-toast-message';

export default props => {
    const { register, control, formState: { errors }, handleSubmit } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const onSubmit = async (data) => {
        let obj = {
            stockSymbolOriginal: data.stockSymbolForm,
            isFixedIncome: true,
            weight: data.weightForm,
            quantity: 1,
            priceFixedIncome: data.priceInBRLForm
        }
        await new AquisitionService().createAquisition(obj);
        Toast.show({
            position: 'bottom',
            text1: 'Oba!',
            text2: 'O ativo ' + data.stockSymbolForm + ' foi cadastrado com sucesso!'
        });
        props.navigation.goBack();
    }

    const onAlter = async (data) => {
        let obj = {
            idAquisition: props.route.params.alterAquisition.aquisition.idAquisition,
            isFixedIncome: true,
            weight: data.weightForm,
            priceFixedIncome: data.priceInBRLForm,
        }
        await new AquisitionService().updateAquisition(obj);
        props.navigation.goBack();
    }


    if (props.route.params.alterAquisition == undefined) {
        return (
            <>
                <View style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}>
                    <ScrollView>
                        <Appbar.Header style={{ alignItems: 'center' }} >
                            <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                            <Appbar.Content
                                title={"Renda Fixa"}
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
                                                existsFixedIncome: async (value) => {
                                                    return !await new StockService().searchStockFixedIncome(value);
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
                                        name="priceInBRLForm"
                                        control={control}
                                        rules={{ required: true, min: 0 }}
                                        render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                            keyboardType='number-pad'
                                            mode="flat"
                                            onBlur={onBlur}
                                            value={value}
                                            label="Valor aplicado em reais"
                                            onChangeText={value => onChange(value)}
                                            style={{
                                                backgroundColor: '#262626'
                                            }}
                                            theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                        />)}
                                    />
                                    <ErrorMessage
                                        type={errors.priceInBRLForm?.type}
                                        error={errors.priceInBRLForm}
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
    else {
        return (
            <>
                <View style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}>
                    <ScrollView>
                        <Appbar.Header style={{ alignItems: 'center' }} >
                            <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                            <Appbar.Content
                                title={"Renda Fixa"}
                                subtitle={"Alterando ".concat(props.route.params.alterAquisition.aquisition.stock.symbol)}
                            />
                        </Appbar.Header>
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
                                            maxLength: 20
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                            mode="flat"
                                            disabled={true}
                                            onBlur={onBlur}
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
                                        rules={{ required: true, min: 0, max: 100 }}
                                        defaultValue={props.route.params.alterAquisition.aquisition.weight.toString()}
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
                                        name="priceInBRLForm"
                                        control={control}
                                        defaultValue={props.route.params.alterAquisition.aquisition.stock.priceInBRL.toString()}
                                        rules={{ required: true, min: 0 }}
                                        render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                            keyboardType='number-pad'
                                            mode="flat"
                                            onBlur={onBlur}
                                            value={value}
                                            label="Valor aplicado em reais"
                                            onChangeText={value => onChange(value)}
                                            style={{
                                                backgroundColor: '#262626'
                                            }}
                                            theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                        />)}
                                    />
                                    <ErrorMessage
                                        type={errors.priceInBRLForm?.type}
                                        error={errors.priceInBRLForm}
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
                                    onPress={handleSubmit(onAlter)}>
                                    Alterar
                        </Button>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </>
        )
    }
}