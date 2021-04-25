import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView, View } from 'react-native';
import { Appbar, Text, TextInput, Title, List, useTheme, Button } from 'react-native-paper';
import { CategoryService } from '../../services/CategoryService';
import { WalletService } from '../../services/WalletService';

export default props => {
    const [description, setDescription] = useState('');

    const [categories, setCategories] = useState(null)

    const [idealPercents, setIdealPercents] = useState([])


    useEffect(() => {
        async function fetchMyAPI() {
            let response = await new CategoryService().getAllCategories();
            setCategories(response)
            categoriesIdealPercents(response);
        }

        fetchMyAPI()
    }, []);

    const categoriesIdealPercents = (categoriesList) => {
        categoriesList.forEach(element => {
            idealPercents.push({ idCategory: element.idCategory, idealPercent: 0 });
        });
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

    const createWalletDetails = () => {
        if (getIdealPercentsSum() == 100) {
            let obj = {
                description: description,
                idealPercents: idealPercents
            }
            new WalletService().createFirstWallet(obj);
            props.goNext();
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

    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Content title="Crie sua primeira carteira!" style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <Text style={{
                marginLeft: Dimensions.get('screen').width * 0.1,
                marginRight: Dimensions.get('screen').width * 0.1,
                marginTop: Dimensions.get('screen').width * 0.15
            }}>
                Para iniciar nossa jornada, primeiro vamos dar um nome para a nossa carteira
                </Text>
            <View>
                <TextInput
                    mode="flat"
                    label="Descrição da carteira"
                    onChangeText={(name) => setDescription(name)}
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
            }}>
                <Title style={{ color: useTheme().colors.primary }}>Porcentagem</Title>
                <Text>Agora me diga, qual o percentual ideal em cada ativo para você?</Text>
                <View>
                    <Text>Soma dos percentuais: {getIdealPercentsSum()}</Text>
                </View>
                <View>
                    <FlatList
                        data={categories}
                        renderItem={renderCategorySlider}
                        keyExtractor={(item, index) => item.idCategory.toString()}
                    />
                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: Dimensions.get('screen').height * 0.02, marginBottom: Dimensions.get('screen').height * 0.05 }}>
                {getIdealPercentsSum() != 100 &&
                    <Text>O total da soma das categorias deve ser 100%!</Text>}
                <Button
                    labelStyle={{ color: useTheme().colors.button.text }}
                    style={{ backgroundColor: useTheme().colors.button.background, width: 200 }}
                    onPress={() => createWalletDetails()}>Avançar</Button>
            </View>
        </ScrollView>
    )
}