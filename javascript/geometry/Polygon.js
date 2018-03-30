import * as TypeCheck from "../tools/TypeCheck.js"
import Point from "./Point.js"
import Draw from "./Draw.js"

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

	draw(context, pointConversion) {
		const draw = new Draw(context, this.points, pointConversion)
		draw.draw()
	}

	// split(line) {
	// 	// TODO return list of polygons
	// }
}

