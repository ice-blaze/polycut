import Point from "../../geometry/Point.js"
import Polygon from "../../geometry/Polygon.js"

const isMainButton = (event) => {
	const mainClick = 1
	return event.buttons === mainClick
}

const getMouseEventPoint = (event) => {
	return new Point(event.offsetX, event.offsetY)
}

export default class MouseHandler {
	constructor(canvasElement, canvas, splitPolygons) {
		this.drawing = canvas.drawing
		this.splitter = canvas.splitter
		this.splitPolygons = splitPolygons
		this.pointConversion = canvas.pointConversion

		this.moveState = false
		this.movingPolygon = new Polygon()

		// need inner function to keep this(class) in clickEvent function...
		canvasElement.addEventListener("mousedown", (e) => {
			return this.clickDown(e)
		}, false)
		canvasElement.addEventListener("mousemove", (e) => {
			return this.clickMove(e)
		}, false)
		canvasElement.addEventListener("mouseup", (e) => {
			return this.clickUp(e)
		}, false)
	}

	clickDown(event) {
		if (!isMainButton(event)) {
			return
		}

		const mouseEventPoint = getMouseEventPoint(event)
		const movedPointPercentage = this.pointConversion.convertPixelPointToPercentagePoint(mouseEventPoint)
		const movingPolygon = this.splitPolygons.isPointInIt(movedPointPercentage)

		if (movingPolygon) {
			this.moveState = true
			this.movingPolygon = movingPolygon
		} else {
			this.splitter.startPoint = mouseEventPoint
		}
	}

	clickMove(event) {
		if (!isMainButton(event)) {
			return
		}

		const mouseEventPoint = getMouseEventPoint(event)

		if (this.moveState) {
			console.log(this.moveState)
			const movedPoint = new Point(
				event.movementX,
				event.movementY,
			)
			const movedPointPercentage = this.pointConversion.convertPixelPointToPercentagePoint(movedPoint)
			this.movingPolygon.move(movedPointPercentage)
		} else {
			this.splitter.endPoint = mouseEventPoint
		}
		this.drawing.redrawWithElements()
	}

	clickUp(event) {
		const mouseEventPoint = getMouseEventPoint(event)

		if (this.moveState) {
			this.moveState = false
		} else {
			this.splitter.endPoint = mouseEventPoint
			this.drawing.redrawWithElements()
			// TODO split !
		}
	}
}
