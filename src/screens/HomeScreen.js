import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import GeneralInvestComponent from '../components/home-components/GeneralInvestComponent'
import StockGridComponent from '../components/home-components/StockGridComponent'
import StockListComponent from '../components/home-components/StockListComponent'
import WelcomeComponent from '../components/home-components/WelcomeComponent'
import { GeneralDataService } from '../services/GeneralDataService'
import { AuthService } from '../services/AuthService'
import DailyGeneralDataChart from '../components/home-components/charts/DailyGeneralDataChart'
import { Paragraph, Title, useTheme } from 'react-native-paper'
import { PieChart } from 'react-native-chart-kit'
import RebalanceJaTheme from '../utils/rebalanceJaTheme'
import ExpositionCategoriesChart from '../components/home-components/charts/ExpositionCategoriesChart'
import AdPublisher from '../components/ad-components/AdPublisher'

export default props => {

    const [name, setName] = useState("")
    const [user, setUser] = useState([])

    useEffect(() => {
        getInitialParams();

    }, [])

    useEffect(() => {
        props.navigation.addListener('focus', async () => {
            getInitialParams();
        });
    }, [])


    const getInitialParams = async () => {
        let generalData = await new GeneralDataService().getGeneralData();
        console.log(generalData);
        if (generalData.aquisitionsSize === 0) {
            props.navigation.navigate('StockScreen');
        }
        if (generalData === 204) {
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
                    <StockGridComponent
                        key={i}
                        gridName={user.generalCategories[i].category.description}
                        totalInvestment={user.generalCategories[i].sumStocks}
                        actual={user.generalCategories[i].actualPercentual}
                        objective={user.generalCategories[i].idealPercentual}
                    />
                )
            }
        }

        return components;
    }

    getColorPieChart = (index) => {
        let colors = ["#7a6621", "#ffd342", "#ba9a2f", "#d4a302", "#fccb31", "#f6ab13"]

        return colors[index];
    }

    getDataPieChart = () => {
        let components = [];
        if (typeof user.generalCategories !== "undefined") {
            for (let i = 0; i < user.generalCategories.length; i++) {

                if (user.generalCategories[i].actualPercentual > 0) {
                    components.push({
                        name: user.generalCategories[i].category.description,
                        actualPercentual: user.generalCategories[i].actualPercentual,
                        color: getColorPieChart(i),
                        legendFontColor: "#fff",
                        legendFontSize: 15
                    })
                }
            }
        }

        return components;
    }

    const hasAnyData = () => {
        return user.sumAllStocks > 0;
    }

    return (
        <View style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}>
            <ScrollView>

                <WelcomeComponent name={name} />
                <GeneralInvestComponent
                    walletDescription={user.wallet?.description}
                    totalInvestments={user.sumAllStocks}
                />

                <StockListComponent >
                    {getGrid()}
                </StockListComponent>
                <View style={{
                    marginBottom: Dimensions.get('screen').height * 0.01,
                    marginTop: Dimensions.get('screen').height * 0.01
                }}>
                    <AdPublisher bannerSize="fullBanner" />
                </View>
                <ExpositionCategoriesChart
                    noData={!hasAnyData()}
                    data={getDataPieChart()}
                />
            </ScrollView>
        </View>
    )
}