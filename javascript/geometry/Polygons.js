import * as TypeCheck from "../tools/TypeCheck.js"
import Polygon from "./Polygon.js"

export default class Polygons {
	constructor(polygons = [new Polygon()]) {
		TypeCheck.isArrayType(polygons, Polygon)
		this.polygons = polygons
	}

	isPointInIt(point) {
		for (const polygon of this.polygons) {
			if (polygon.isPointInIt(point)) {
				return polygon
			}
		}

		return false
	}

	split(line) {
		let newPolygons = []
		for (const polygon of this.polygons) {
			newPolygons = newPolygons.concat(
				polygon.split(line)
			)
		}

		this.polygons = newPolygons
	}
}
