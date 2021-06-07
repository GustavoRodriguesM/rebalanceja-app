import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";

export class StockService {
  constructor() {
    this.utilService = new UtilService();
  }

  async findBySymbol(stockSearch) {
    try {
      let objResponse = null;
      let accessToken = await new AuthService().getAccessToken();
      await axios({
        method: "get",
        url: new UtilService().getStockBySymbol(stockSearch),
        headers: { Authorization: "Bearer " + accessToken },
      })
        .then(function (response) {
          objResponse = response.data;
        })
        .catch(function (response) {
          return null;
        });
      return objResponse;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  async searchStockFixedIncome(stockSearch) {
    try {
      let existsResponse = false;
      let accessToken = await new AuthService().getAccessToken();
      await axios({
        method: "get",
        url: new UtilService().getStockExistsFixedIncomeUrl(stockSearch),
        headers: { Authorization: "Bearer " + accessToken },
      })
        .then(function (response) {
          existsResponse = true;
        })
        .catch(function (response) {
          existsResponse = false;
        });
      return existsResponse;
    } catch (e) {
      console.log(e);
    }
    return existsResponse;
  }

  async searchStock(stockSearch) {
    try {
      let accessToken = await new AuthService().getAccessToken();
      let listResponse = null;
      await axios({
        method: "get",
        headers: { Authorization: "Bearer " + accessToken },
        url: new UtilService().getYahooFinanceUrl(stockSearch),
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
        headers: { Authorization: "Bearer " + accessToken },
        data: obj,
      })
        .then(function (response) {
          apiResponse = response.data.exists;
        })
        .catch(function (response) {
          console.log("existsInActiveWallet");
          console.log(response.response);
          apiResponse = false;
        });
      return !apiResponse;
    } catch (e) {
      console.log("existsInActiveWallet");
      console.log(e);
    }
  }
}
