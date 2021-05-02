import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useTheme } from 'react-native-paper'
import { WalletService } from '../../../services/WalletService'
import { AquisitionService } from '../../../services/AquisitionService'
import CardStockComponent from '../../../components/stocks-components/CardStockComponent'


export default (props) => {

    const [activeWallet, setActiveWallet] = useState()
    const [aquisitions, setAquisitions] = useState()

    const fetchMyAPI = async () => {
        let walletLocal = await new WalletService().getActiveWallet();
        let walletStocks = await new WalletService().getAquisitionsByWalletAndCategory(walletLocal.idWallet, props.route.params.idCategory);

        setActiveWallet(walletLocal)
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

    const renderItemAquisition = ({ item, index }) => {
        let colorPrimary = '#ffd342'
        return (
            <CardStockComponent
                key={index}
                indexKey={index}
                walletDescription={activeWallet.description}
                obj={item}
                lengthList={aquisitions.length}
                colorSwitch={colorPrimary}
                colorDivider={colorPrimary}
                colorTitle={colorPrimary}
                onClickDeleteIncome={onClickDeleteIncome}
                onClickAlterIncome={onClickAlterIncome}
                onToggleSwitch={onToggleSwitch} />
        )
    }

    const onToggleSwitch = async (obj, index) => {
        let aquisitionsLocal = [...aquisitions]
        let objLocal = obj
        objLocal.allocate = !objLocal.allocate
        aquisitionsLocal[index] = objLocal;
        await new AquisitionService().changeAllocate(obj.idAquisition, activeWallet.idWallet);
        setAquisitions(aquisitionsLocal)
    }

    const onClickDeleteIncome = async (aquisition) => {
        await new AquisitionService().deleteAquisition(aquisition.idAquisition)
        await fetchMyAPI();
    }

    const onClickAlterIncome = async (aquisition) => {
        let alterAquisition = {
            idWallet: activeWallet.idWallet,
            aquisition: aquisition
        }
        if (aquisition.stock.category.idCategory !== 5) {
            props.navigation.navigate('AquisitionVariableIncomeSubscreen', { alterAquisition: alterAquisition })
        } else {
            props.navigation.navigate('AquisitionFixedIncomeSubscreen', { alterAquisition: alterAquisition })
        }

    }

    return (
        <>
            <FlatList
                style={{
                    backgroundColor: useTheme().colors.viewBackground
                }}
                data={aquisitions}
                renderItem={renderItemAquisition}
                keyExtractor={item => item.idAquisition.toString()}
            />
        </>
    )
}