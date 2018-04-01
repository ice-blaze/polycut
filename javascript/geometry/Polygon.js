import * as TypeCheck from "../tools/TypeCheck.js"
import Point from "./Point.js"

const shiftArrayRightLooped = (array) => {
	const copiedArray = array.slice()

	const lastItem = copiedArray.pop()
	copiedArray.unshift(lastItem)

	return copiedArray
}

const zip = (arr, ...arrs) => {
	return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}

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

	getEdges() {
		const startPoints = shiftArrayRightLooped(this.points)
		const endPoints = this.points
		const edges = zip(startPoints, endPoints)

		return edges
	}

	isPointInIt(point) {
		const edges = this.getEdges()

		let c = false
		for (const [start, end] of edges) {
			const firstTest = (end.y > point.y) != (start.y > point.y)
			if ( firstTest &&
				(point.x < (start.x - end.x) *
				(point.y - end.y) /
				(start.y - end.y) + end.x)
			) {
				c = !c
			}
		}
		// console.log(c)
		return c;
	}

	// split(line) {
	// 	// TODO return list of polygons
	// }
}

