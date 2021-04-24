import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, FlatList, View } from 'react-native';
import { Appbar, Button, FAB, List, Modal, Portal, Text, TextInput, useTheme } from 'react-native-paper'
import { CategoryService } from '../../../services/CategoryService';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { StockService } from '../../../services/StockService';
import { AquisitionService } from '../../../services/AquisitionService';
import { WalletService } from '../../../services/WalletService';

export default props => {

    const [categories, setCategories] = useState([])
    const [expandedList, setExpandedList] = useState([])
    const [aquisitions, setAquisitions] = useState([])


    /* modal variables */
    const [showModal, setShowModal] = useState(false)
    const [stockList, setStockList] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [weight, setWeight] = useState(0)
    const [selectedStock, setSelectedStock] = useState("")
    /* modal variables */

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await new CategoryService().getAllCategories();
            setCategories(response);
            createExpandedList(response);
        }

        fetchMyAPI()
    }, []);

    const createExpandedList = (list) => {
        let expandedListLocal = []
        list.forEach(obj => {
            expandedListLocal.push({ idCategory: obj.idCategory, isExpanded: true })
        });
        setExpandedList(expandedListLocal)
    }

    const getExpandedByCategory = (item) => {
        let search = false;
        if (expandedList !== 'undefined') {
            expandedList.forEach(obj => {
                if (obj.idCategory === item.idCategory)
                    search = obj;
            })

            return search.isExpanded;
        }

        return false;
    }

    const changeExpandedByCategory = (item, index) => {
        if (expandedList !== 'undefined') {
            let list = [...expandedList]
            let obj = expandedList[index];
            list[index] = { idCategory: obj.idCategory, isExpanded: !obj.isExpanded }
            setExpandedList(list)
        }
    }

    const getAquisitionsByCategory = (category) => {
        let aquisitionsList = []
        aquisitions.forEach(obj => {
            if(category.idCategory === obj.stock.category.idCategory)
                aquisitionsList.push(obj)
        })

        return aquisitionsList;
    }

    renderAquisitionsComponent = ({ item, index }) => {
        return (
            <List.Item
                title={item.stock.symbol}
                description={"Peso: " + item.weight}
            />
        )
    }

    renderCategoriesListComponent = ({ item, index }) => {
        return (
            <List.Accordion
                title={item.description}
                onPress={() => changeExpandedByCategory(item, index)}
                expanded={getExpandedByCategory(item)}>
                <FlatList
                    data={getAquisitionsByCategory(item)}
                    renderItem={renderAquisitionsComponent}
                    keyExtractor={(item2, index2) => item2.idAquisition.toString()}
                />
            </List.Accordion>
        )
    }

    const addNewStock = () => {
        setShowModal(true);
    }

    const findStockSearch = useCallback(
        async (stockName) => {
            let list = await new StockService().searchStock(stockName);
            let arr = []
            for (let i = 0; i < list.length; i++) {
                let name = list[i].symbol + ' - ' + (list[i].longName == null ? list[i].shortName : list[i].longName);
                arr.push({ id: list[i].symbolOriginal, name: name })
            }
            setStockList(arr);
            return arr;
        },
        []
    );

    const createAquisition = async () => {
        let data = {
            stockSymbolOriginal: selectedStock.id,
            weight: weight,
            quantity: quantity
        }
        await new AquisitionService().createAquisition(data);
        let wallet = await new WalletService().getActiveWallet();
        setAquisitions(wallet.aquisitions);
        setShowModal(false);
    }

    return (
        <>
            <Portal>
                <Modal
                    visible={showModal}
                    dismissable={false}
                    contentContainerStyle={{
                        margin: Dimensions.get('screen').width * 0.05,
                        borderRadius: 20,
                        backgroundColor: useTheme().colors.viewBackgroundSecundary,
                        height: Dimensions.get('screen').height * 0.5
                    }}
                >
                    <View style={{ margin: Dimensions.get('screen').width * 0.05 }}>
                        <Text style={{ marginLeft: Dimensions.get('screen').width * 0.03 }}>Vamos buscar pelo seu ativo</Text>
                        <SearchableDropdown
                            onItemSelect={(item) => {
                                setSelectedStock(item)
                            }}

                            containerStyle={{ padding: 5 }}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: useTheme().colors.viewBackground,
                                borderColor: '#bbb',
                            }}
                            itemTextStyle={{ color: useTheme().colors.text }}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={stockList}
                            textInputProps={
                                {
                                    placeholder: selectedStock === "" ? "Buscar ativo" : selectedStock.name.split(' ')[0],
                                    placeholderTextColor: useTheme().colors.text,
                                    underlineColorAndroid: "transparent",
                                    backgroundColor: useTheme().colors.viewBackground,
                                    style: {
                                        padding: 12,
                                        color: '#fff',
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                    },
                                    onTextChange: async text => await findStockSearch(text)
                                }
                            }
                            listProps={{ nestedScrollEnabled: true }}
                        />
                        <Text>Agora digite um do ativo, essa peso vai de 0 a 100.</Text>
                        <TextInput
                            keyboardType='number-pad'
                            mode="flat"
                            label="Peso do ativo (0 - 100)"
                            value={weight.toString()}
                            onChangeText={(weight) => setWeight(weight)}
                            style={{
                                backgroundColor: '#262626'
                            }}
                            theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                        />
                        <Text>Você já possui alguma ação desse ativo?</Text>
                        <TextInput
                            keyboardType='number-pad'
                            mode="flat"
                            label="Quantidade"
                            value={quantity.toString()}
                            onChangeText={(quantity) => setQuantity(quantity)}
                            style={{
                                backgroundColor: '#262626'
                            }}
                            theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <Button onPress={() => setShowModal(false)}>Cancelar</Button>
                        <Button
                            labelStyle={{ color: useTheme().colors.button.text }}
                            style={{ backgroundColor: useTheme().colors.button.background, width: 200 }}
                            onPress={() => createAquisition()}>Cadastrar</Button>
                    </View>
                </Modal>
            </Portal>
            <View style={useTheme().styles.defaultBackgroundWithFlex}>
                <Appbar.Header>
                    <Appbar.Content title="Ativos" style={{ alignItems: 'center' }} />
                    <Appbar.Action icon="check" onPress={() => props.onGoBack()} />
                </Appbar.Header>

                <Text>Teste</Text>

                <List.Section style={{ margin: Dimensions.get('screen').width * 0.05 }}>
                    <View>
                        <FlatList
                            data={categories}
                            renderItem={renderCategoriesListComponent}
                            keyExtractor={(item, index) => item.idCategory.toString()}
                        />
                    </View>
                </List.Section>
            </View>
            <FAB
                style={{
                    position: 'absolute',
                    margin: 40,
                    right: 0,
                    bottom: 0,
                    backgroundColor: useTheme().colors.primary
                }}
                small={false}
                icon="plus"
                onPress={() => addNewStock()}
            />
        </>
    )
}