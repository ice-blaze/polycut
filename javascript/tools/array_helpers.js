export const shiftArrayRightLooped = (array) => {
	const copiedArray = array.slice()

	const lastItem = copiedArray.pop()
	copiedArray.unshift(lastItem)

	return copiedArray
}

export const zip = (arr, ...arrs) => {
	return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}
