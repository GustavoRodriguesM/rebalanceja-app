export class UtilService {

    getServerHost = () => {
        return "http://192.168.1.67:9000";
    }

    getAquisitionsByWallet= (idWallet) => {
        return this.getServerHost().concat("/wallets/").concat(idWallet);
    }

    getCreateAquisitionUrl = () => {
        return this.getServerHost().concat("/aquisition");
    }

    getYahooFinanceUrl = (stockName) => {
        return this.getServerHost().concat("/yahoo-finance/search/").concat(stockName);
    }

    getCreateFirstWalletUrl = () => {
        return this.getServerHost().concat("/wallets/first")
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

    
    getAllWallets = () => {
        return this.getServerHost().concat("/wallets/user")
    }    
    getActiveWallet = () => {
        return this.getServerHost().concat("/wallets/user/active")
    }

    getCheckTokenUrl = (token) => {
        return this.getServerHost().concat("/oauth/check_token?token=").concat(token)
    }

    getLoginUrl = () => {
        return this.getServerHost().concat("/oauth/token")
    }

    getRegisterUrl = () => {
        return this.getServerHost().concat("/auth/register")
    }

    getGeneralDataUrl = () => {
        return this.getServerHost().concat("/general/data/")
    }

    getFinancialSupportUrl = (financialSupport) => {
        return this.getServerHost().concat("/rebalance/financial-support?financialSupport=").concat(financialSupport)
    }

}