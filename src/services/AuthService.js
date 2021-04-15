import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UtilService } from './UtilService'


export class AuthService {

    constructor() {
        this.utilService = new UtilService();
        this.ACCESS_TOKEN = 'access_token';
        this.ACCESS_TOKEN_EXP = 'access_token_expiration';
        this.REFRESH_TOKEN = 'refresh_token';
        this.NAME = 'name';
    }

    async removeToken() {
        await AsyncStorage.removeItem(this.ACCESS_TOKEN);
        await AsyncStorage.removeItem(this.ACCESS_TOKEN_EXP);
        await AsyncStorage.removeItem(this.NAME);
        await AsyncStorage.removeItem(this.REFRESH_TOKEN);
    }

    async getAccessToken() {
        return await AsyncStorage.getItem(this.ACCESS_TOKEN);
    }

    async getName() {
        return await AsyncStorage.getItem(this.NAME);
    }

    async getAccessTokenExp() {
        return await AsyncStorage.getItem(this.ACCESS_TOKEN_EXP);
    }

    async getRefreshToken() {
        return await AsyncStorage.getItem(this.REFRESH_TOKEN);
    }

    hasTokenValid = async () => {
        let accessToken = await this.getAccessToken();
        //let accessTokenExp = await this.getAccessTokenExp();
        let valid = false;
        await axios({
            method: 'get',
            url: this.utilService.getCheckTokenUrl(accessToken),
        }).then((response) => {
            valid = true;
        }).catch((response) => {
            valid = false;
        });

        return valid;
    }

    loginViaRefreshToken = async () => {
        let self = this;
        let refreshToken = await this.getRefreshToken();
        let utilService = new UtilService();
        //let accessTokenExp = await this.getAccessTokenExp();
        if (refreshToken) {
            try {
                var bodyFormData = new FormData();
                bodyFormData.append('grant_type', 'refresh_token');
                bodyFormData.append('refresh_token', refreshToken);
    
                axios({
                    method: "post",
                    url: utilService.getLoginUrl(),
                    data: bodyFormData,
                    headers: { "Authorization": "Basic d2ViOjEyMw==" }
                })
                    .then(function (response) {
                        self.saveToken(response);
                    })
                    .catch(function (response) {
                        //console.log(response);
                        console.log(response.response)
                    });
            } catch (e) {
                console.log(e);
            }
        }
    }

    getBasicAuthorization = () => {
        return { "Authorization": "Basic d2ViOjEyMw==" }
    }

    saveToken = (response) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        AsyncStorage.setItem(this.REFRESH_TOKEN, response.data.refresh_token);
        AsyncStorage.setItem(this.ACCESS_TOKEN_EXP, JSON.stringify(response.data.exp));
        AsyncStorage.setItem(this.ACCESS_TOKEN, response.data.access_token);
        AsyncStorage.setItem(this.NAME, response.data.name);
    }

}