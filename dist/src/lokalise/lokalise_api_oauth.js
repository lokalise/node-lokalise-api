import { LokaliseApi } from "./lokalise_api";
export class LokaliseApiOAuth extends LokaliseApi {
    constructor(params) {
        super(params);
        const tokenType = Object(params)["tokenType"];
        if (tokenType) {
            this.clientData.tokenType = tokenType;
        }
        else {
            this.clientData.tokenType = "Bearer";
        }
        this.clientData.authHeader = "Authorization";
    }
}
//# sourceMappingURL=lokalise_api_oauth.js.map