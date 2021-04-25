import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView, View } from 'react-native';
import { Appbar, Text, TextInput, Title, List, useTheme, Button, FAB, Snackbar } from 'react-native-paper';
import { AsyncStorageService } from '../../../services/AsyncStorageService';
import { CategoryService } from '../../../services/CategoryService';
import { WalletService } from '../../../services/WalletService';

export default props => {
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([])
    const [idealPercents, setIdealPercents] = useState([])
    const [wallet, setWallet] = useState([])


    useEffect(() => {
        async function fetchMyAPI() {
            let response = await new CategoryService().getAllCategories();
            let walletLocal = await new WalletService().getActiveWallet();
            setCategories(response)
            categoriesIdealPercents(response, walletLocal);
            setDescription(walletLocal.description)
            setWallet(walletLocal)
        }
        fetchMyAPI()
    }, []);

    const categoriesIdealPercents = (categoriesList, oldWalletLocal) => {
        oldWalletLocal.idealPercents.forEach(oldElement => {
            idealPercents.push({ idCategory: oldElement.category.idCategory, idealPercent: oldElement.idealPercent });
        })
    }

    const changeIdealPercentValue = (value, index) => {
        let newArray = [...idealPercents];
        let oldObj = newArray[index];
        let newObj = { idCategory: oldObj.idCategory, idealPercent: value };
        newArray[index] = newObj;
        setIdealPercents(newArray)
    }

    const getActualIdealPercent = (index) => {
        if ((typeof idealPercents === 'undefined') || (typeof idealPercents[index] === 'undefined') || (typeof idealPercents[index].idealPercent === 'undefined'))
            return 0;
        else
            return idealPercents[index].idealPercent.toFixed(2);
    }

    const getIdealPercentsSum = () => {
        if ((typeof idealPercents === 'undefined'))
            return 0;
        else {
            let sum = 0;
            for (let i = 0; i < idealPercents.length; i++) {
                sum += idealPercents[i].idealPercent;
            }

            return sum.toFixed(2);
        }
    }

    const createWalletDetails = async () => {
        if (getIdealPercentsSum() == 100) {
            let dataObj = {
                description: description,
                idealPercents: idealPercents
            }
            await new WalletService().updateWallet(wallet.idWallet, dataObj);
            await new AsyncStorageService().removeWalletToAlterConfig();
            props.navigation.navigate('HomeScreen')
        }
    }

    renderCategorySlider = ({ item, index }) => {
        return (
            <List.Item
                title={item.description}
                description={getActualIdealPercent(index) + '%'}
                right={() => <Slider
                    minimumValue={0}
                    maximumValue={100}
                    value={idealPercents[index]}
                    onValueChange={(value) => changeIdealPercentValue(value, index)}
                    style={{ width: 180, height: 40 }}
                    step={0.5}
                    thumbTintColor={useTheme().colors.primary}
                    minimumTrackTintColor={useTheme().colors.primary}
                    maximumTrackTintColor={useTheme().colors.primary}
                />}
            />
        )
    }

    const getCategories = () => {
        let components = [];
        categories.forEach((obj, index) => {
            components.push(
                <List.Item
                    key={obj.idCategory}
                    title={obj.description}
                    description={getActualIdealPercent(index) + '%'}
                    right={() => <Slider
                        minimumValue={0}
                        maximumValue={100}
                        value={idealPercents[index]}
                        onValueChange={(value) => changeIdealPercentValue(value, index)}
                        style={{ width: 180, height: 40 }}
                        step={0.5}
                        thumbTintColor={useTheme().colors.primary}
                        minimumTrackTintColor={useTheme().colors.primary}
                        maximumTrackTintColor={useTheme().colors.primary}
                    />}
                />
            )
        })

        return components
    }

    return (
        <>
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}>
                    <View>
                        <TextInput
                            mode="flat"
                            label="Descrição da carteira"
                            value={description}
                            onChangeText={(description) => setDescription(description)}
                            style={{
                                marginTop: Dimensions.get('screen').height * 0.01,
                                marginLeft: Dimensions.get('screen').width * 0.1,
                                marginRight: Dimensions.get('screen').width * 0.1,
                                backgroundColor: '#262626',
                                width: Dimensions.get('screen').width * 0.8
                            }}
                            theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                        />
                    </View>
                    <View style={{
                        marginTop: Dimensions.get('screen').height * 0.05,
                        marginLeft: Dimensions.get('screen').width * 0.1,
                        marginRight: Dimensions.get('screen').width * 0.1,
                        marginBottom: Dimensions.get('screen').width * 0.2,
                    }}>
                        <Title style={{ color: useTheme().colors.primary }}>Porcentagem</Title>
                        <Text>Agora me diga, qual o percentual ideal em cada ativo para você?</Text>
                        <View style={{ alignItems: 'center', marginTop: Dimensions.get('screen').height * 0.02, marginBottom: Dimensions.get('screen').height * 0.05 }}>
                            {getIdealPercentsSum() != 100 &&
                                <Text style={{color: '#CF3341'}}>O total da soma das categorias deve ser 100%!</Text>}
                        </View>
                        <View>
                            <Text>Soma dos percentuais: {getIdealPercentsSum()}</Text>
                        </View>
                        <View>
                            {getCategories()}
                        </View>
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
                label={"Salvar alterações"}
                icon="check"
                onPress={() => createWalletDetails()}
            />
        </>
    )
}