import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from './UtilService'

export class StockService {

    constructor() {
        this.utilService = new UtilService();
    }

    async findBySymbol(stockSearch) {
        let objResponse
        try {
            objResponse = null;
            await axios({
                method: "get",
                url: new UtilService().getStockBySymbol(stockSearch)
            })
            .then(function (response) {
                objResponse = response.data;
            })
            .catch(function (response) {
                console.log(response.response)
                return null;
            });
            return objResponse;
        } catch (e) {
            console.log(e);
        }
        return null;;
    }

    async searchStock(stockSearch) {
        try {
            let listResponse = null;
            await axios({
                method: "get",
                url: new UtilService().getYahooFinanceUrl(stockSearch)
            })
            .then(function (response) {
                listResponse = response.data;
            })
            .catch(function (response) {
                listResponse = response.response;
            });
            return listResponse;
        } catch (e) {
            console.log(e);
        }
    }

    async existsInActiveWallet(obj) {
        try {
            let accessToken = await new AuthService().getAccessToken();
            let apiResponse = null;
            await axios({
                method: "post",
                url: new UtilService().getExistsInActiveWalletUrl(),
                headers: {Authorization: 'Bearer ' + accessToken},
                data: obj
            })
            .then(function (response) {
                apiResponse = response.data.exists;
            })
            .catch(function (response) {
                console.log(response.response);
                apiResponse = false;
            });
            return !apiResponse;
        } catch (e) {
            console.log(e);
        }
    }

}