import * as TypeCheck from "../tools/TypeCheck.js"
import {shiftArrayRightLooped, zip} from "../tools/array_helpers.js"
import CollisionCounter from "./CollisionCounter.js"
import Line from "./Line.js"
import Point from "./Point.js"

const NO_UNPROCESSED = -1
const getFirstUnProcessedIndex = (points) => {
	const NEXT = 1
	for (let index = 0; index < points.length; index += NEXT) {
		const point = points[index]
		if (!point.isProcessed && !point.isCollision) {
			return index
		}
	}

	return NO_UNPROCESSED
}

const getIndexOfBrotherCollisionPoint = (points, collisionPointIndex) => {
	let inc = 0
	if (points[collisionPointIndex].isFirst) {
		inc = 1
	} else {
		inc = -1
	}
	let index = collisionPointIndex + inc
	while (!points[index].isCollision) {
		index += inc
		if (index === -1) {
			index = points.length - 1
		} else if (index === points.length) {
			index = 0
		}
	}

	return index
}

class EvenOddFlag {
	constructor(startValue = true) {
		this.flag = startValue
	}

	get() {
		const initialVal = this.flag
		this.flag = !this.flag
		return initialVal
	}
}

class SmartIndex {
	constructor(index, length) {
		this.index = index
		this.startIndex = index
		this.length = length
		this.firstPass = true
	}

	increment() {
		this.index += 1
		if (this.index === this.length) {
			this.index = 0
		}

		this.firstPass = false
	}

	isNotFinish() {
		return this.firstPass || this.index !== this.startIndex
	}
}

class PointsWithCollision {
	constructor(originalPoints, smartIndex) {
		this.originalPoints = originalPoints
		this.smartIndex = smartIndex
		this.points = []
	}

	pushCollision(currentPoint) {
		this.points.push(currentPoint)
		const brotherIndex = getIndexOfBrotherCollisionPoint(this.originalPoints, this.smartIndex.index)
		this.points.push(this.originalPoints[brotherIndex])
		this.smartIndex.index = brotherIndex
	}

	pushNormal(currentPoint) {
		currentPoint.isProcessed = true
		this.points.push(currentPoint)
	}

	push(currentPoint) {
		if (currentPoint.isCollision) {
			this.pushCollision(currentPoint)
		} else {
			this.pushNormal(currentPoint)
		}
	}
}

const processPolygon = (pointsWithCollision, startIndex) => {
	const smartIndex = new SmartIndex(startIndex, pointsWithCollision.length)
	const newPolygonPoints = new PointsWithCollision(pointsWithCollision, smartIndex)

	while (smartIndex.isNotFinish()) {
		const currentPoint = pointsWithCollision[smartIndex.index]

		newPolygonPoints.push(currentPoint)

		smartIndex.increment()
	}

	return newPolygonPoints.points
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
		const START = 0
		const END = 1
		const startPoints = shiftArrayRightLooped(this.points)
		const endPoints = this.points
		const edgesNoLine = zip(startPoints, endPoints)
		const edges = edgesNoLine.map(array => new Line(array[START], array[END]))

		return edges
	}

	isPointInIt(point) {
		const edges = this.getEdges()

		let c = false
		for (const edge of edges) {
			const start = edge.start
			const end = edge.end
			const firstTest = (end.y > point.y) != (start.y > point.y)
			if ( firstTest &&
				(point.x < (start.x - end.x) *
				(point.y - end.y) /
				(start.y - end.y) + end.x)
			) {
				c = !c
			}
		}
		return c;
	}

	pointsWithCollision(splitLine) {
		const pointsWithCollision = []

		const isFirstCollision = new EvenOddFlag(true)
		const collisionCounter = new CollisionCounter()
		const edges = this.getEdges()
		for (const edge of edges) {
			pointsWithCollision.push({
				x: edge.start.x,
				y: edge.start.y,
				isCollision: false,
				isProcessed: false,
			})

			const collisionPoint = splitLine.isIntersecting(edge)
			if (collisionPoint) {
				collisionCounter.increment()
				pointsWithCollision.push({
					x: collisionPoint.x,
					y: collisionPoint.y,
					isCollision: true,
					first: isFirstCollision.get(),
				})
			}
		}

		collisionCounter.isEven()

		return pointsWithCollision
	}

	split(line) {
		const pointsWithCollision = this.pointsWithCollision(line)
		const newPolygons = []

		let startIndex = getFirstUnProcessedIndex(pointsWithCollision)
		while (startIndex !== NO_UNPROCESSED) {
			const newPolygonPoints = processPolygon(pointsWithCollision, startIndex)

			const cleanNewPoints = newPolygonPoints.map(point => new Point(point.x, point.y))
			newPolygons.push(new Polygon(cleanNewPoints))
			startIndex = getFirstUnProcessedIndex(pointsWithCollision)
		}
		// TODO ignore polygons too small (case when line touch a point or an edge) dont return polygons

		return newPolygons
	}
}
