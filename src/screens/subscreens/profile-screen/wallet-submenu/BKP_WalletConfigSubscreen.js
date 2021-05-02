import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Button, List, Snackbar, TextInput, withTheme, RadioButton, Switch } from 'react-native-paper';
import CategorySliderItem from '../../../../components/stocks-components/CategorySliderItem';

class WalletConfigSubscreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpandedListCategories: false,
            idealPercents: props.route.params.idealPercents,
            isSumDifferent100: false,
            walletDescription: props.route.params.description,
            isPrimaryWallet: props.route.params.active,
            isValid: true
        };
        this.countTotal(this);
    }

    countTotal(self) {
        let valor = 0;
        for (let i = 0; i < self.props.route.params.idealPercents.length; i++) {
            let obj = self.props.route.params.idealPercents[i];
            valor += obj.idealPercent;
        }
        return valor;
    }

    alterar(index, value) {
        let list = this.state.idealPercents;
        list[index].idealPercent = value;
        this.setState({ idealPercents: list });
        let teste = this.countTotal(this);

        if (teste != 100) {
            this.setState({ isSumDifferent100: true });
            this.setState({ isValid: false })
        } else {
            this.setState({ isSumDifferent100: false });
            this.setState({ isValid: true })
        }
    }

    renderItem = ({ index }) => {
        return (
            <CategorySliderItem
                title={this.props.route.params.idealPercents[index].category.description}
                initialValue={this.props.route.params.idealPercents[index].idealPercent}
                countTotalFunction={() => this.countTotal(this)}
                alterarFuncao={(value) => this.alterar(index, value)}
            />
        )
    }

    render() {
        const { props } = this;
        return (
            <View style={props.theme.styles.defaultBackgroundWithFlex}>
                <List.Section title="Configurações gerais">
                    <TextInput
                        label="Descrição da carteira"
                        mode="outlined"
                        value={this.state.walletDescription}
                        style={{
                            backgroundColor: this.props.theme.colors.textInputBackground,
                            marginLeft: Dimensions.get('screen').width * 0.05,
                            marginRight: Dimensions.get('screen').width * 0.05,
                        }}
                        theme={{ colors: { text: this.props.theme.colors.text, placeholder: this.props.theme.colors.text, primary: this.props.theme.colors.text } }}
                        onChangeText={walletDescription => this.setState({ walletDescription })} />
                    <View style={{
                        flexDirection: 'row', 
                        alignItems: 'baseline', 
                        justifyContent: 'space-between', 
                        marginRight: Dimensions.get('screen').width * 0.1, 
                        marginTop: Dimensions.get('screen').width * 0.05,
                        marginLeft: Dimensions.get('screen').width * 0.05
                        }}>
                        <Text style={{color: this.props.theme.colors.text}}>Carteira principal?</Text>

                        <Switch value={this.state.isPrimaryWallet} onValueChange={() => this.setState({isPrimaryWallet: !this.state.isPrimaryWallet})}/>
                    </View>
                    {this.state.isSumDifferent100 &&
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#fff', alignItems: 'center', }}>Soma das porcentagens é menor que 100!</Text>
                        </View>
                    }
                    <List.Accordion
                        title={"Categorias Total: " + this.countTotal(this)}
                        left={props => <List.Icon {...props} icon="folder" />}
                        expanded={this.state.isExpandedListCategories}
                        onPress={() => { this.setState({ isExpandedListCategories: !this.state.isExpandedListCategories }) }}>
                        <FlatList
                            data={this.state.idealPercents}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </List.Accordion>
                </List.Section>

                <ScrollView>
                    <Button mode="contained"
                        labelStyle={{ color: this.props.theme.colors.text }}
                        style={{ backgroundColor: this.props.theme.colors.primary }}>
                        Alterar
                    </Button>
                </ScrollView>
            </View >
        )
    }
}

export default withTheme(WalletConfigSubscreen)