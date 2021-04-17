import React, { Component } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { withTheme } from "react-native-paper";

class DailyGeneralDataChart extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LineChart
                style={{
                    borderRadius: 10
                }}
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={Dimensions.get('screen').width * 0.9}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: this.props.theme.colors.homeScreenChart.backgroundGradientFrom,
                    backgroundGradientTo: this.props.theme.colors.homeScreenChart.backgroundGradientTo,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    scrollableDotStrokeColor: this.props.theme.colors.primary,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: this.props.theme.colors.primary
                    }
                }}
            />
        )
    }
}

export default withTheme(DailyGeneralDataChart);