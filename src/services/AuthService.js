import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UtilService } from './UtilService'


export class AuthService {

    constructor() {
        this.utilService = new UtilService();
        this.ACCESS_TOKEN = 'access_token';
        this.ACCESS_TOKEN_EXP = 'access_token_expiration';
        this.NAME = 'name';
    }

    login = async (loginData) => {
        let self = this;
        let success = 0;
        try {

            await axios({
                method: "post",
                url: self.utilService.getLoginUrl(),
                data: loginData,
            })
                .then(function (response) {
                    self.saveToken(response);
                    success = 1;
                })
                .catch(function (response) {
                    if (response.response.data.error_description === 'Bad credentials') {
                        success = 2;
                    } else {
                        success = 3;
                    }
                });
        } catch (e) {
            console.log(e);
        }

        return success;
    }

    async register(state, userData) {
        try {
            await axios({
                method: "post",
                url: new UtilService().getRegisterUrl(),
                data: userData
            })
                .then(function (response) {
                    console.log("Teste");
                })
                .catch(function (response) {
                    console.log(response.response);
                });
        } catch (e) {
            console.log(e);
        }
    }

    async removeToken() {
        await AsyncStorage.removeItem(this.ACCESS_TOKEN);
        await AsyncStorage.removeItem(this.ACCESS_TOKEN_EXP);
        await AsyncStorage.removeItem(this.NAME);
    }

    async logout() {
        await this.removeToken();
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

    hasTokenValid = async () => {
        let accessToken = await this.getAccessToken();
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

    saveToken = (response) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        AsyncStorage.setItem(this.ACCESS_TOKEN_EXP, JSON.stringify(response.data.expirationDate));
        AsyncStorage.setItem(this.ACCESS_TOKEN, response.data.accessToken);
        AsyncStorage.setItem(this.NAME, response.data.name);
    }

}