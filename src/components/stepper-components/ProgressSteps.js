import React, { Component } from 'react'
import { View } from 'react-native'
import { withTheme } from 'react-native-paper'

class ProgressSteps extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    {this.props.children[this.props.renderItem]}
                </View>
            </View>
        )
    }
}

export default withTheme(ProgressSteps);
