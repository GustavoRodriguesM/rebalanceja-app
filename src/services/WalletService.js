import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";

export class WalletService {

    constructor() {
        this.utilService = new UtilService();
        this.authService = new AuthService();
    }

    async getAllWallets(state) {
        let accessToken = await this.authService.getAccessToken();
        console.log("chamou");
        await axios({
            method: 'get',
            url: this.utilService.getAllWallets(),
            headers: {Authorization: 'Bearer ' + accessToken }
        }).then((response) => {
            state.setState({wallets: response.data})
        }).catch((response) => {
            //console.log(response.response)
            console.log("Falha ao chamar: getAllWallets()");
        });
    }

    async getActiveWallet() {
        let accessToken = await this.authService.getAccessToken();
        let wallet = [];
        await axios({
            method: 'get',
            url: this.utilService.getActiveWallet(),
            headers: {Authorization: 'Bearer ' + accessToken }
        }).then((response) => {
            wallet = response.data;
        }).catch((response) => {
            console.log(response.response)
            console.log("Falha ao chamar: getActiveWallet()");
        });

        return wallet;
    }

    async createFirstWallet(data) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'post',
            url: this.utilService.getCreateFirstWalletUrl(),
            headers: {Authorization: 'Bearer ' + accessToken },
            data: data
        }).then((response) => {
            AsyncStorage.setItem("firstWallet", JSON.stringify(response.data));
        }).catch((response) => {
            //console.log(response.response)
            console.log(response.response);
            console.log("Falha ao chamar: createFirstWallet()");
        });
    }

}