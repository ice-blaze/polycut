import * as TypeCheck from "../tools/TypeCheck.js"
import Polygon from "./Polygon.js"

export default class Polygons {
	constructor(polygons = [new Polygon()]) {
		TypeCheck.isArrayType(polygons, Polygon)
		this.polygons = polygons
	}

	split(line) {
		// TODO return list of polygons
	}
}
