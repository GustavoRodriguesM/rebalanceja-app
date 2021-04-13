import React, { Component } from 'react'
import { SafeAreaView, Text, View }  from 'react-native'

export default class StockScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
            stageNew: false,
            errorBadCredentials: false
        };


    }

    render() {
        return (
            <Text>Teste</Text>
        )
    }
}
