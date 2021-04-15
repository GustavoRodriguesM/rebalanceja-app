import axios from 'axios'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import GeneralInvestComponent from '../components/home-components/GeneralInvestComponent'
import StockGridComponent from '../components/home-components/StockGridComponent'
import StockListComponent from '../components/home-components/StockListComponent'
import WelcomeComponent from '../components/home-components/WelcomeComponent'
import { GeneralDataService } from '../services/GeneralDataService'
import DefaultStyle from '../styles/defaultStyle'
import {NavigationEvents} from 'react-navigation';
import { AuthService } from '../services/AuthService'

export default class HomeScreen extends Component {
    
    state = {
        user: [],
        name: []
    }

    constructor(props) {
        super(props);
        this.generalDataService = new GeneralDataService();

        this.authService = new AuthService();
        this.teste();
    }

    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            let hasTokenValid = await this.authService.hasTokenValid();

            if (!hasTokenValid ) {
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
        if(typeof this.state.user.generalCategories !== "undefined") {
            for(let i = 0; i < this.state.user.generalCategories.length; i++) {
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
            <View style={DefaultStyle.defaultBackground}>
                <WelcomeComponent name={this.state.name} />
                <GeneralInvestComponent
                    bgColor='#52BB9C'
                    totalInvestments={this.state.user.sumAllStocks}
                />
                <StockListComponent >
                    {this.getGrid()}
                </StockListComponent>
            </View>
        )
    }
}