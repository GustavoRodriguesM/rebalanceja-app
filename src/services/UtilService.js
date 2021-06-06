import Constants from 'expo-constants'

export class UtilService {

    getServerHost = () => {
        //return !__DEV__ ? "https://still-mesa-03512.herokuapp.com" : "http://192.168.1.67:9000";
        return !__DEV__ ? "https://still-mesa-03512.herokuapp.com" : "http://192.168.1.67:3000";
    }

    getCheckTokenUrl = (token) => {
        return this.getServerHost().concat("/oauth/check_token?token=").concat(token)
    }

    getLoginUrl = () => {
        return this.getServerHost().concat("/auth/login")
    }

    getRegisterUrl = () => {
        return this.getServerHost().concat("/auth/register")
    }

    getPermitAddAquisitionUrl = () => {
        return this.getServerHost().concat("/aquisition/permit-add");
    }

    getStockExistsFixedIncomeUrl = (stockSymbol) => {
        return this.getServerHost().concat("/stocks/exists/fixedIncome/").concat(stockSymbol);
    }

    getSearchUserUrl = (searchEmail) => {
        return this.getServerHost().concat("/users/exists-email/");
    }

    getStockBySymbol = (stockSymbol) => {
        return this.getServerHost().concat("/stocks/findBySymbol/").concat(stockSymbol);
    }

    getExistsInActiveWalletUrl = () => {
        return this.getServerHost().concat("/aquisition/exists");
    }

    getChangeAllocateAquisitonUrl = (idAquisition, idWallet) => {
        return this.getServerHost().concat("/aquisition/").concat(idAquisition).concat("/wallet/").concat(idWallet).concat("/changeAllocate");
    }

    getAquisitionsByWalletAndCategory = (idWallet, idCategory) => {
        //return this.getServerHost().concat("/wallets/").concat(idWallet).concat("/category/").concat(idCategory);
        return this.getServerHost().concat("/aquisitions/find-by-active-user/category/").concat(idCategory);
    }

    getAquisitionsByWallet = (idWallet) => {
        return this.getServerHost().concat("/wallets/").concat(idWallet);
    }

    getUpdateAquisitionUrl = () => {
        return this.getServerHost().concat("/aquisition");
    }

    getCreateAquisitionUrl = () => {
        return this.getServerHost().concat("/aquisition");
    }

    getYahooFinanceUrl = (stockName) => {
        return this.getServerHost().concat("/yahoo-finance/search/").concat(stockName);
    }

    getCreateFirstWalletUrl = () => {
        return this.getServerHost().concat("/wallets")
    }

    getWalletPutUrl = (idWallet) => {
        return this.getServerHost().concat("/wallets/").concat(idWallet)
    }

    getAvailableSubscriptionPlans = () => {
        return this.getServerHost().concat("/subscription-plans/active")
    }

    getUpdateQuantityUrl = () => {
        return this.getServerHost().concat("/aquisition/quantity")
    }

    getDeleteAquisitionUrl = (idAquisition) => {
        return this.getServerHost().concat("/aquisition/").concat(idAquisition)
    }

    getAllWallets = () => {
        return this.getServerHost().concat("/wallets/user")
    }
    getActiveWallet = () => {
        return this.getServerHost().concat("/wallets/user/active")
    }

    getGeneralDataUrl = () => {
        return this.getServerHost().concat("/wallets/dashboard")
    }

    getFinancialSupportUrl = () => {
        return this.getServerHost().concat("/rebalance/financial-support")
    }

}