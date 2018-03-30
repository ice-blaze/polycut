export const isType = (object, classe) => {
	return object instanceof classe
}

export const isArrayType = (objectArray, classe) => {
	if (objectArray instanceof Array) {
		const typeValidation = objectArray.map(object => isType(object, classe))
		return typeValidation.every(type => type === true)
	}

	throw new Error("objectArray wasn't an array")
}
