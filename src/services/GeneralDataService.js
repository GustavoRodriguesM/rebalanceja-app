import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export async function getGeneralData(state) {
    let teste = await AsyncStorage.getItem('access_token');
    console.log(teste);
    axios({
        method: 'get',
        url: "http://192.168.1.67:9000/general/data/",
    }).then((response) => {
        state.setState({user: response.data})
    }).catch((response) => {
        console.log(response.response)
    });
}