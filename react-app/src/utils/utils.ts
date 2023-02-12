export const useDebounce = (func: (...arg: any[]) => any, time = 400) => {
	let timerId: ReturnType<typeof setTimeout>;
	return (...arg: any[]) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(func, time, ...arg);
	};
};
