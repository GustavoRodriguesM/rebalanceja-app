import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";

export class CategoryService {
  constructor() {
    this.utilService = new UtilService();
    this.authService = new AuthService();
  }

  getAllCategories = async () => {
    let accessToken = await this.authService.getAccessToken();
    let categories = [];

    await axios({
      method: "get",
      url: this.utilService.getServerHost() + "/categories",
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => {
        categories = response.data;
      })
      .catch((response) => {
        console.log("Falha ao chamar: getAllCategories()");
        categories = response.response;
      });
    return categories;
  };
}
