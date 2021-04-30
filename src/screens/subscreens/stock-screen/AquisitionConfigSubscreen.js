import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Paragraph, useTheme, Appbar, Portal, FAB, Provider } from 'react-native-paper'
import { WalletService } from '../../../services/WalletService'
import { AquisitionService } from '../../../services/AquisitionService'
import CardStockComponent from '../../../components/stocks-components/CardStockComponent'


export default props => {

    const [aquisitions, setAquisitions] = useState([])
    const [description, setDescription] = useState([])

    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    const  fetchMyAPI = async () => {
        let walletLocal = await new WalletService().getActiveWallet();
        let walletStocks = await new WalletService().getAquisitionsByWallet(walletLocal.idWallet);
        setDescription(walletLocal.description)
        setAquisitions(walletStocks)
    }

    useEffect(() => {
        
            fetchMyAPI();
    },[])


    useEffect(() => {
        props.navigation.addListener('focus', async () => {
            fetchMyAPI();
        });
    },[])

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
        let colorPrimary = useTheme().colors.primary

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

    return (
        <View style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}>
            <ScrollView>
                <Appbar.Header>
                    <Appbar.Content title={description} subtitle={"Ativos"} style={{ alignItems: 'center' }} />
                </Appbar.Header>
                <Paragraph>Adicione seus ativos aqui!</Paragraph>
                <Paragraph>Qualquer ação é salva automaticamente</Paragraph>

                <View >
                    <View style={{ flex: 1 }}>
                        {getStockListCard()}
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
