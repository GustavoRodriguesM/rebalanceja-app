export class UtilService {

    getServerHost = () => {
        return "http://192.168.1.67:9000";
    }

    getAllWallets = () => {
        return this.getServerHost().concat("/wallets/user")
    }

    getCheckTokenUrl = (token) => {
        return this.getServerHost().concat("/oauth/check_token?token=").concat(token)
    }

    getLoginUrl = () => {
        return this.getServerHost().concat("/oauth/token")
    }

    getGeneralDataUrl = () => {
        return this.getServerHost().concat("/general/data/")
    }

    getFinancialSupportUrl = (financialSupport) => {
        return this.getServerHost().concat("/rebalance/financial-support?financialSupport=").concat(financialSupport)
    }

}