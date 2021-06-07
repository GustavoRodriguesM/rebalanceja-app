import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UtilService } from "./UtilService";

export class AuthService {
  constructor() {
    this.utilService = new UtilService();
    this.ACCESS_TOKEN = "access_token";
    this.ACCESS_TOKEN_EXP = "access_token_expiration";
    this.REFRESH_TOKEN = "refresh_token";
    this.NAME = "name";
  }

  isTokenExpired = async () => {
    const expirationDate = await this.getAccessTokenExp();
    const actualDate = new Date().getTime();
    if (expirationDate < actualDate) {
      this.logout();
      return true;
    }

    return false;
  };

  login = async (loginData) => {
    let self = this;
    let success = 0;
    try {
      var bodyFormData = new FormData();
      bodyFormData.append("grant_type", "password");
      bodyFormData.append("username", loginData.username);
      bodyFormData.append("password", loginData.password);

      await axios({
        method: "post",
        url: self.utilService.getLoginUrl(),
        data: bodyFormData,
        headers: self.getBasicAuthorization(),
      })
        .then(function (response) {
          self.saveToken(response);
          success = 1;
        })
        .catch(function (response) {
          if (response.response.data.error_description === "Bad credentials") {
            success = 2;
          } else {
            success = 3;
          }
        });
    } catch (e) {
      console.log(e);
    }

    return success;
  };

  async register(state, userData) {
    try {
      await axios({
        method: "post",
        url: new UtilService().getRegisterUrl(),
        data: userData,
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
    await AsyncStorage.removeItem(this.REFRESH_TOKEN);
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

  async getRefreshToken() {
    return await AsyncStorage.getItem(this.REFRESH_TOKEN);
  }

  getBasicAuthorization = () => {
    return { Authorization: "Basic d2ViOjEyMw==" };
  };

  saveToken = (response) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.access_token}`;
    AsyncStorage.setItem(this.REFRESH_TOKEN, response.data.refresh_token);
    AsyncStorage.setItem(
      this.ACCESS_TOKEN_EXP,
      JSON.stringify(response.data.exp)
    );
    AsyncStorage.setItem(this.ACCESS_TOKEN, response.data.access_token);
    AsyncStorage.setItem(this.NAME, response.data.name);
  };
}
