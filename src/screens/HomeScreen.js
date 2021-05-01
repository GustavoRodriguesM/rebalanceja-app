import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import GeneralInvestComponent from '../components/home-components/GeneralInvestComponent'
import StockGridComponent from '../components/home-components/StockGridComponent'
import StockListComponent from '../components/home-components/StockListComponent'
import WelcomeComponent from '../components/home-components/WelcomeComponent'
import { GeneralDataService } from '../services/GeneralDataService'
import { AuthService } from '../services/AuthService'
import DailyGeneralDataChart from '../components/home-components/charts/DailyGeneralDataChart'
import { useTheme } from 'react-native-paper'

export default props => {

    const [name, setName] = useState("")
    const [user, setUser] = useState([])

    useEffect(() => {
        getInitialParams();
    }, [])

    useEffect(() => {
        props.navigation.addListener('focus', async () => {
            let hasTokenValid = await new AuthService().hasTokenValid();

            if (!hasTokenValid) {
                await new AuthService().loginViaRefreshToken();
            }
            getInitialParams();
        });
    }, [])


    const getInitialParams = async () => {
        let generalData = await new GeneralDataService().getGeneralData();

        if(generalData === 204) {
            props.navigation.navigate('InitialParamsScreen');
        } else {
            setUser(generalData);
        }

        setName(await new AuthService().getName())
    }


    const getGrid = () => {
        let components = [];
        if (typeof user.generalCategories !== "undefined") {
            for (let i = 0; i < user.generalCategories.length; i++) {
                components.push(
                    <StockGridComponent key={i}
                        gridName={user.generalCategories[i].category.description}
                        bgColor={user.generalCategories[i].category.defaultColor}
                        totalInvestment={user.generalCategories[i].sumStocks}
                        actual={user.generalCategories[i].actualPercentual}
                        objective={user.generalCategories[i].idealPercentual}
                    />
                )
            }
        }

        return components;
    }

    return (
        <View style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}>
            <ScrollView>

                <WelcomeComponent name={name} />
                <GeneralInvestComponent
                    totalInvestments={user.sumAllStocks}
                />

                <StockListComponent >
                    {getGrid()}
                </StockListComponent>

                <View style={{ marginTop: Dimensions.get('screen').height * 0.02 }}>
                    <Text style={{ marginLeft: Dimensions.get('screen').width * 0.05, color: useTheme().colors.text, fontSize: 16 }}>Acompanhamento diário</Text>
                    <View style={{ marginTop: Dimensions.get('screen').height * 0.01, alignItems: 'center' }}>
                        <DailyGeneralDataChart />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}