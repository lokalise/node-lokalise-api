export function getCollectionItem<T>(
	collection: { items: readonly T[] },
	index?: number,
): T;

export function getCollectionItem<T, K extends string>(
	collection: Record<K, readonly T[]>,
	key: K,
	index?: number,
): T;

export function getCollectionItem<T>(
	collection: Record<string, readonly T[]>,
	keyOrIndex: string | number = "items",
	index = 0,
): T {
	const key = typeof keyOrIndex === "string" ? keyOrIndex : "items";

	const resolvedIndex = typeof keyOrIndex === "number" ? keyOrIndex : index;

	const items = collection[key];

	if (!items) {
		throw new Error(
			`Expected collection property "${key}" to contain an array`,
		);
	}

	const item = items[resolvedIndex];

	if (item === undefined) {
		throw new Error(
			`Expected collection item at index ${resolvedIndex} in "${key}", but collection has ${items.length} item(s)`,
		);
	}

	return item;
}

export function getArrayItem<T>(items: readonly T[], index = 0): T {
	const item = items[index];

	if (item === undefined) {
		throw new Error(
			`Expected array item at index ${index}, but array has ${items.length} item(s)`,
		);
	}

	return item;
}
