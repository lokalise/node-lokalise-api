import { readFile } from "fs/promises";
export class LokalisePkg {
    static pkgPath() {
        return "../../package.json";
    }
    static async getVersion() {
        let pkg;
        try {
            pkg = JSON.parse((await readFile(new URL(LokalisePkg.pkgPath(), import.meta.url))).toString());
        }
        catch (_e) {
            pkg = null;
        }
        return pkg ? pkg.version : "unknown";
    }
}
//# sourceMappingURL=pkg.js.map