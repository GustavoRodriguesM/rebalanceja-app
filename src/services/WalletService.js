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

    async updateWallet(idWallet, dataObj) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'put',
            url: this.utilService.getWalletPutUrl(idWallet),
            headers: {Authorization: 'Bearer ' + accessToken },
            data: dataObj
        }).then((response) => {
        }).catch((response) => {
            console.log(response.response)
            console.log("Falha ao chamar: getAllWallets()");
        });
    }

    async getAquisitionsByWallet(idWallet) {
        let accessToken = await this.authService.getAccessToken();
        let aquisitions = [];
        await axios({
            method: 'get',
            url: this.utilService.getAquisitionsByWallet(idWallet),
            headers: {Authorization: 'Bearer ' + accessToken }
        }).then((response) => {
            aquisitions = response.data.aquisitions;
        }).catch((response) => {
            console.log(response.response)
            console.log("Falha ao chamar: getAquisitionsByWallet()");
        });

        return aquisitions;
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