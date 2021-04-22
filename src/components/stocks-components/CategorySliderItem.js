import Slider from '@react-native-community/slider';
import React, { Component } from 'react'
import { List, withTheme } from 'react-native-paper'

class CategorySliderItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            initialValue: props.initialValue,
            sliderValue: props.initialValue,
            maxValue: props.initialValue,
        }
    }

    onValueChange(newValue) {
        let countTotal = this.props.countTotalFunction();
        let teste = 100 - countTotal + this.props.initialValue - newValue ;
        if((countTotal + newValue - this.props.initialValue) <= 100) {
            this.setState({sliderValue: newValue});
            this.setState({maxValue: teste + newValue});
            this.props.alterarFuncao(newValue);
        }else{
            this.setState({sliderValue: this.state.initialValue})
        }
    }

    render() {
        return (
            <List.Item
                title={this.props.title}
                description={this.state.sliderValue}
                right={() => <Slider
                    minimumValue={0}
                    maximumValue={this.state.maxValue}
                    onValueChange={(value) => this.onValueChange(value)}
                    style={{ width: 180, height: 40 }}
                    step={0.5}
                    thumbTintColor={this.props.theme.colors.primary}
                    minimumTrackTintColor={this.props.theme.colors.primary}
                    maximumTrackTintColor={this.props.theme.colors.primary}
                    value={this.state.sliderValue}
                />}
            />
        )
    }
}

export default withTheme(CategorySliderItem);