import axios from 'axios'
import React, { Component } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import GeneralInvestComponent from '../components/home-components/GeneralInvestComponent'
import StockGridComponent from '../components/home-components/StockGridComponent'
import StockListComponent from '../components/home-components/StockListComponent'
import WelcomeComponent from '../components/home-components/WelcomeComponent'
import { GeneralDataService } from '../services/GeneralDataService'
import DefaultStyle from '../styles/defaultStyle'
import { NavigationEvents } from 'react-navigation';
import { AuthService } from '../services/AuthService'
import { LineChart } from 'react-native-chart-kit'
import { getPrimaryColor } from '../styles/DefaultColors'
import DailyGeneralDataChart from '../components/home-components/charts/DailyGeneralDataChart'
import { DefaultThemeColors } from '../styles/DefaultThemeColors'

export default class HomeScreen extends Component {

    state = {
        user: [],
        name: []
    }



    constructor(props) {
        super(props);
        this.generalDataService = new GeneralDataService();
        this.defaultThemeColors = new DefaultThemeColors();

        this.authService = new AuthService();
        this.teste();
    }

    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            let hasTokenValid = await this.authService.hasTokenValid();

            if (!hasTokenValid) {
                await this.authService.loginViaRefreshToken();
            }
            this.teste();
        });

    }

    teste = async () => {
        this.generalDataService.getGeneralData(this);
        this.state.name = await this.authService.getName();
    }

    getGrid = () => {
        let components = [];
        if (typeof this.state.user.generalCategories !== "undefined") {
            for (let i = 0; i < this.state.user.generalCategories.length; i++) {
                components.push(
                    <StockGridComponent key={i}
                        gridName={this.state.user.generalCategories[i].category.description}
                        bgColor={this.state.user.generalCategories[i].category.defaultColor}
                        totalInvestment={this.state.user.generalCategories[i].sumStocks}
                        actual={this.state.user.generalCategories[i].actualPercentual}
                        objective={this.state.user.generalCategories[i].idealPercentual}
                    />
                )
            }
        }

        return components;
    }

    render() {
        return (
            <View style={{ backgroundColor: this.defaultThemeColors.getBackgroundViewColor(), flex: 1 }}>
                <WelcomeComponent name={this.state.name} />
                <GeneralInvestComponent
                    totalInvestments={this.state.user.sumAllStocks}
                />

                <StockListComponent >
                    {this.getGrid()}
                </StockListComponent>

                <View style={{ marginTop: Dimensions.get('screen').height * 0.02 }}>
                    <Text style={{ marginLeft: Dimensions.get('screen').width * 0.05, color: this.defaultThemeColors.getDefaultTextColor(), fontSize: 16 }}>Acompanhamento diário</Text>
                    <View style={{ marginTop: Dimensions.get('screen').height * 0.01, alignItems: 'center' }}>
                        <DailyGeneralDataChart />
                    </View>
                </View>
            </View>
        )
    }
}