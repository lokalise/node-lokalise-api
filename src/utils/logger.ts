/**
 * Emits a warning to the console unless `silent` is true.
 *
 * @param silent - If true, suppresses the log output.
 * @param args - The items to log, passed to `console.warn`.
 */
export function warn(silent: boolean, ...args: unknown[]): void {
	if (silent) return;

	console.warn(...args);
}
