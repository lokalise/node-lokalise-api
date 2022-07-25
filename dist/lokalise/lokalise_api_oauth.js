import { LokaliseApi } from "./lokalise_api.js";
export class LokaliseApiOAuth extends LokaliseApi {
    constructor(params) {
        super(params);
        const tokenType = params["tokenType"];
        this.clientData.tokenType = tokenType ?? "Bearer";
        this.clientData.authHeader = "Authorization";
    }
}
//# sourceMappingURL=lokalise_api_oauth.js.map