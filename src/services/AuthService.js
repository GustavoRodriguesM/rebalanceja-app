import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export function hasTokenValid() {
    let accessToken = AsyncStorage.getItem('access_token');
    let valid = false;
    console.log(accessToken);
    axios({
        method: 'get',
        url: "http://192.168.1.67:9000/oauth/check_token?token=".concat(accessToken),
    }).then((response) => {
        valid = true;
        console.log('Valido!');
    }).catch((response) => {
        valid = false;
        console.log('Nao valido!');
    });

    return valid;
}