export abstract class BaseModel<
	T extends Record<string, unknown> = Record<string, unknown>,
> {
	constructor(params: Partial<T>) {
		Object.assign(this, params);
	}
}
