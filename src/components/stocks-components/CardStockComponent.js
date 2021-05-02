import React from 'react'
import { Dimensions, View } from 'react-native'
import { Card, Divider, Paragraph, Switch, Provider, Menu, Button, Modal, Text, Portal, useTheme } from 'react-native-paper'
import BRLCurrencyFormat from '../../utils/BRLCurrencyFormat'

export default props => {

    /* MENU */
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);
    const openMenu = () =>  setIsMenuVisible(true);
    const closeMenu = () => setIsMenuVisible(false);
    /* MENU */

    /* MODAL */
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const openModal = () => {
        closeMenu()
        setIsModalVisible(true)
    }
    const closeModal = () => setIsModalVisible(false);
    /* MODAL */

    const getCardStyle = () => {
        let cardStyle = []
        if (props.indexKey === props.lengthList - 1)
            cardStyle = {
                width: Dimensions.get('screen').width * 0.8,
                marginLeft: Dimensions.get('screen').width * 0.1,
                marginRight: Dimensions.get('screen').width * 0.1,
                marginBottom: Dimensions.get('screen').height * 0.15
            }
        else {
            cardStyle = {
                width: Dimensions.get('screen').width * 0.8,
                marginLeft: Dimensions.get('screen').width * 0.1,
                marginRight: Dimensions.get('screen').width * 0.1,
            }
        }
        return cardStyle;
    }

    const onClickAlterIncome = () => {
        props.onClickAlterIncome(props.obj);
        closeMenu();
    }

    const onClickDeleteIncome = () => {
        props.onClickDeleteIncome(props.obj)
        closeMenu()
        closeModal()
    }

    const onToggleSwitch = (obj, indexKey) => {
        props.onToggleSwitch(obj, indexKey)
    }

    return (
        <>
            <Portal>
                <Modal
                    visible={isModalVisible}
                    contentContainerStyle={{
                        borderRadius: 10,
                        backgroundColor: '#2d2a32',
                        padding: 20,
                        marginRight: Dimensions.get('screen').width * 0.1,
                        marginLeft: Dimensions.get('screen').width * 0.1
                    }}>
                    <Text>Deseja realmente remover o ativo {props.obj.stock.symbol} da carteira {props.walletDescription}?</Text>
                    <View style={{
                        flexDirection: 'row', 
                        marginTop: Dimensions.get('screen').height * 0.02, 
                        justifyContent: 'center'
                    }}>
                        <Button onPress={() => closeModal()}>
                            Cancelar
                        </Button>
                        <Button onPress={() => onClickDeleteIncome()}>
                            Remover
                        </Button>
                    </View>
                </Modal>
            </Portal>
            <Menu
                visible={isMenuVisible}
                onDismiss={closeMenu}
                statusBarHeight={Dimensions.get('screen').height * 0.1}
                anchor={
                    <Card key={props.indexKey} style={getCardStyle()}
                        onLongPress={() => {
                            openMenu()
                        }}>
                        <Card.Title
                            title={props.obj.stock.symbol}
                            titleStyle={{ color: props.colorTitle }}
                            subtitle={props.obj.stock.longName} />
                        <Card.Content>
                            {props.obj.stock.category.idCategory == 5 &&
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'baseline',
                                        justifyContent: 'space-between'
                                    }}>
                                    <Paragraph>Preço unitário</Paragraph>
                                    <Paragraph>{"R$ " + BRLCurrencyFormat(props.obj.stock.price * props.obj.quantity)}</Paragraph>
                                </View>
                            }
                            {props.obj.stock.category.idCategory != 5 &&
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'baseline',
                                        justifyContent: 'space-between'
                                    }}>
                                    <Paragraph>Preço unitário</Paragraph>
                                    <Paragraph>{"R$ " + BRLCurrencyFormat(props.obj.stock.priceInBRL)}</Paragraph>
                                </View>
                            }
                            {(props.obj.stock.category.idCategory == 3 || props.obj.stock.category.idCategory == 4 || props.obj.stock.category.idCategory == 6) &&
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'baseline',
                                        justifyContent: 'space-between'
                                    }}>
                                    <Paragraph>Preço local</Paragraph>
                                    <Paragraph>{props.obj.stock.currency + " " + BRLCurrencyFormat(props.obj.stock.price)}</Paragraph>
                                </View>
                            }
                            {(props.obj.stock.category.idCategory != 5) &&
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'baseline',
                                        justifyContent: 'space-between'
                                    }}>
                                    <Paragraph>Posição</Paragraph>
                                    <Paragraph>{"R$ " + BRLCurrencyFormat(props.obj.stock.priceInBRL * props.obj.quantity)}</Paragraph>
                                </View>
                            }
                            {props.obj.stock.category.idCategory != 5 &&
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'baseline',
                                        justifyContent: 'space-between'
                                    }}>
                                    <Paragraph>Quantidade</Paragraph>
                                    <Paragraph>{props.obj.quantity}</Paragraph>
                                </View>
                            }
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'baseline',
                                    justifyContent: 'space-between'
                                }}>
                                <Paragraph>Peso</Paragraph>
                                <Paragraph>{props.obj.weight}</Paragraph>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'baseline',
                                    justifyContent: 'space-between'
                                }}>
                                <Paragraph>Aportar</Paragraph>
                                <Switch
                                    value={props.obj.allocate}
                                    onValueChange={() => onToggleSwitch(props.obj, props.indexKey)}
                                    color={props.colorSwitch}
                                />
                            </View>
                            <Divider style={{
                                backgroundColor: props.colorDivider,
                                marginTop: Dimensions.get('screen').height * 0.02,
                                opacity: 0.3
                            }} />
                        </Card.Content>
                    </Card>
                }>
                <Menu.Item onPress={() => { onClickAlterIncome() }} title="Alterar ativo" />
                <Menu.Item onPress={() => { openModal() }} title="Remover ativo" />
            </Menu>
        </>
    )
}