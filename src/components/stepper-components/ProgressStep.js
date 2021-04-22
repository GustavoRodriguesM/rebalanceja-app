import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Button, withTheme } from 'react-native-paper'

class ProgressStep extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        if(this.props.hide)
            return null;
        return (
            <View>
                {this.props.children}
            </View>
        )
    }

}

export default withTheme(ProgressStep);