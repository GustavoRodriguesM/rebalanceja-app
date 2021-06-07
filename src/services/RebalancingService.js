import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";

export class RebalancingService {
  constructor() {
    this.authService = new AuthService();
    this.utilService = new UtilService();
  }

  async rebalance(financialSupport: string) {
    let accessToken = await this.authService.getAccessToken();
    let responseList = [];

    if (financialSupport.includes(",")) {
      financialSupport = financialSupport.replace(".", "").replace(",", ".");
    }

    await axios({
      method: "post",
      url: this.utilService.getFinancialSupportUrl(),
      headers: { Authorization: "Bearer " + accessToken },
      data: {
        financialSupport: financialSupport,
      },
    })
      .then((response) => {
        responseList = response.data;
      })
      .catch((response) => {
        //console.log(response.response)
        console.log("Erro rebalance()");
      });

    return responseList;
  }
}
