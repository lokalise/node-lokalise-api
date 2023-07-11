import { readFile } from "fs/promises";
import { Keyable } from "../interfaces/keyable.js";

export class LokalisePkg {
  static pkgPath() {
    return "../../package.json";
  }

  static async getVersion(): Promise<string> {
    let pkg: Keyable | null;

    try {
      pkg = JSON.parse(
        (
          await readFile(new URL(LokalisePkg.pkgPath(), import.meta.url))
        ).toString(),
      );
    } catch (_e) {
      pkg = null;
    }

    return pkg ? pkg.version : "unknown";
  }
}
