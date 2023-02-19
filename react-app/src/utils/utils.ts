export const useDebounce = (func: (...arg: any[]) => any, time = 400) => {
	let timerId: ReturnType<typeof setTimeout>;
	return (...arg: any[]) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(func, time, ...arg);
	};
};

export const toggleArrayValue = <T>(array: T[], value: T) =>
	array.includes(value)
		? array.filter((el) => el !== value)
		: [...array, value];

const getSortedString = <T>(arr: T[]) => JSON.stringify([...arr].sort());

export const compareArrays = <T>(arr1: T[], arr2: T[]): boolean =>
	getSortedString(arr1) === getSortedString(arr2);
