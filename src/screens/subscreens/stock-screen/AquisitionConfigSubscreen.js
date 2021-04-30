import React, { useEffect, useState } from 'react'
import { ScrollView, View, FlatList, SectionList } from 'react-native'
import { Paragraph, useTheme, Appbar, Portal, FAB, Provider } from 'react-native-paper'
import { WalletService } from '../../../services/WalletService'
import { AquisitionService } from '../../../services/AquisitionService'
import CardStockComponent from '../../../components/stocks-components/CardStockComponent'
import { SafeAreaView } from 'react-native-safe-area-context'


export default props => {

    const [aquisitions, setAquisitions] = useState([])
    const [description, setDescription] = useState([])

    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    const fetchMyAPI = async () => {
        let walletLocal = await new WalletService().getActiveWallet();
        let walletStocks = await new WalletService().getAquisitionsByWallet(walletLocal.idWallet);
        setDescription(walletLocal.description)
        setAquisitions(walletStocks)
    }

    useEffect(() => {

        fetchMyAPI();
    }, [])


    useEffect(() => {
        props.navigation.addListener('focus', async () => {
            fetchMyAPI();
        });
    }, [])

    const onToggleSwitch = async (obj, index) => {
        let aquisitionsLocal = [...aquisitions]
        let objLocal = obj
        let walletLocal = await new WalletService().getActiveWallet();
        objLocal.allocate = !objLocal.allocate
        aquisitionsLocal[index] = objLocal;
        await new AquisitionService().changeAllocate(obj.idAquisition, walletLocal.idWallet);
        setAquisitions(aquisitionsLocal)
    }



    const getStockListCard = () => {
        let components = [];

        aquisitions.forEach((obj, index) => {
            components.push(
                <CardStockComponent
                    key={index}
                    indexKey={index}
                    obj={obj}
                    lengthList={aquisitions.length}
                    colorSwitch={colorPrimary}
                    colorDivider={colorPrimary}
                    colorTitle={colorPrimary}
                    onToggleSwitch={onToggleSwitch} />
            )
        }
        )

        return components;
    }

    const renderItemAquisition = ({ item, index }) => {
        let colorPrimary = '#ffd342'
        return (
            <CardStockComponent
                key={index}
                indexKey={index}
                obj={item}
                lengthList={aquisitions.length}
                colorSwitch={colorPrimary}
                colorDivider={colorPrimary}
                colorTitle={colorPrimary}
                onToggleSwitch={onToggleSwitch} />
        )
    }

    const getAquisitionsByCategory = (idCategory) => {
        let listAquisitionsNew = []

        aquisitions.forEach(obj => {
            if (obj.stock.category.idCategory === idCategory)
                listAquisitionsNew.push(obj);
        })

        return listAquisitionsNew;
    }

    const renderFlatListByCategory = (idCategory) => {
        return (
            <FlatList
                horizontal={true}
                data={getAquisitionsByCategory(idCategory)}
                renderItem={renderItemAquisition}
                keyExtractor={item => item.idAquisition.toString()}
            />
        )
    }

    return (
        <View style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}>
            <ScrollView>
                <View>
                    <Appbar.Header>
                        <Appbar.Content title={description} subtitle={"Ativos"} style={{ alignItems: 'center' }} />
                    </Appbar.Header>
                    <Paragraph>Adicione seus ativos aqui!</Paragraph>
                    <Paragraph>Qualquer ação é salva automaticamente</Paragraph>


                    <View >
                        {renderFlatListByCategory(1)}
                        {renderFlatListByCategory(2)}
                        {renderFlatListByCategory(3)}
                        {renderFlatListByCategory(4)}
                        {renderFlatListByCategory(5)}
                        {renderFlatListByCategory(6)}
                    </View>
                </View>
            </ScrollView>
            <Provider>
                <Portal>
                    <FAB.Group
                        open={open}
                        icon={'plus'}
                        color={useTheme().colors.viewBackground}
                        fabStyle={{
                            backgroundColor: useTheme().colors.primary,
                        }}
                        actions={[
                            {
                                icon: 'star',
                                label: 'Renda variável',
                                onPress: async () => props.navigation.navigate('AquisitionVariableIncomeSubscreen', await new WalletService().getActiveWallet()),
                            },
                            {
                                icon: 'email',
                                label: 'Renda fixa',
                                onPress: async () => props.navigation.navigate('AquisitionFixedIncomeSubscreen', await new WalletService().getActiveWallet()),
                            }
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>
            </Provider>
        </View>
    )
}

//{getStockListCard()}