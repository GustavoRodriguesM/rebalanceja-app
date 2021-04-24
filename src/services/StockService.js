import axios from "axios";
import { UtilService } from './UtilService'

export class StockService {

    constructor() {
        this.utilService = new UtilService();
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

}