import * as TypeCheck from "../tools/TypeCheck.js"
import Point from "./Point.js"

export default class Polygon {
	static defaultTriangle() {
		return [
			new Point(0.2, 0.2),
			new Point(0.7, 0.2),
			new Point(0.4, 0.7),
		]
	}

	constructor(points = Polygon.defaultTriangle()) {
		TypeCheck.isArrayType(points, Point)
		this.points = points
	}

	move(movedPoint) {
		this.points = this.points.map(point => {
			return point.add(movedPoint)
		})
	}

	isPointInIt(point) {
		return false
		// TODO
	}

	// split(line) {
	// 	// TODO return list of polygons
	// }
}

