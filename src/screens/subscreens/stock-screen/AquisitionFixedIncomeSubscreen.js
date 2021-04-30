import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { Appbar, Button, TextInput, useTheme } from 'react-native-paper'
import ErrorMessage from '../../../components/utils-components/ErrorMessage';
import { AquisitionService } from '../../../services/AquisitionService';
import { StockService } from '../../../services/StockService';

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

        props.navigation.goBack();
    }

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


/*

    const [value, setValue] = useState(null);
    const [stockList, setStockList] = useState([]);

    const findStockName = async (stockName) => {
        setValue(stockName)
        let list = await new StockService().searchStock(stockName);
        let arr = []
        for (let i = 0; i < list.length; i++) {
            let name = list[i].symbol + ' - ' + (list[i].longName == null ? list[i].shortName : list[i].longName);
            arr.push({ id: list[i].symbolOriginal, name: name })
        }
        setStockList(arr);
        return arr;
    }

    const selectedItem = (selectedStock) => {
        console.log(selectedStock.id)
    }


<View>
                            <Text>Example Modal.  Click outside this area to dismiss.</Text>

                            <View style={{
                                flex: 1,
                                marginBottom: Dimensions.get('screen').height * 0.05
                            }}>
                                <View style={{
                                    backgroundColor: useTheme().colors.viewBackground,
                                    flex: 1,
                                    left: 0,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    zIndex: 1
                                }}>
                                    <Autocomplete
                                        data={stockList}
                                        value={value}

                                        style={{
                                            backgroundColor: '#000',
                                            color: '#fff'
                                        }}
                                        select
                                        onChangeText={(text) => findStockName(text.toUpperCase())}
                                        flatListProps={{
                                            keyExtractor: (_, idx) => idx.toString(),
                                            renderItem: ({ item }) => <TouchableOpacity style={{
                                                backgroundColor: '#161616'
                                            }} onPress={() => selectedItem(item)}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    margin: 2,
                                                    color: '#fff',
                                                    backgroundColor: '#161616'
                                                }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        }}
                                    />
                                </View>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button style={{ backgroundColor: useTheme().colors.primary, color: '#000' }} theme={{ colors: { text: '#000' } }} onPress={() => setShowFixedIncomeModal(false)} >Cancelar</Button>
                            <Button
                                style={{
                                    backgroundColor: useTheme().colors.primary,
                                    color: '#000'
                                }}
                                theme={{
                                    colors: {

                                        accent: '#000',
                                        text: '#000'
                                    }
                                }}>Cadastrar</Button>
                        </View>

*/