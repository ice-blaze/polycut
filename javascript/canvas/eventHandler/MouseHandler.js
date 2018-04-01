import Point from "../../geometry/Point.js"

const isMainButton = (event) => {
	const mainClick = 1
	return event.buttons === mainClick
}

const getMouseEventPoint = (event) => {
	return new Point(event.offsetX, event.offsetY)
}

export default class MouseHandler {
	constructor(canvasElement, drawing, splitter) {
		this.drawing = drawing
		this.splitter = splitter

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
		this.splitter.startPoint = mouseEventPoint
	}

	clickMove(event) {
		if (!isMainButton(event)) {
			return
		}

		const mouseEventPoint = getMouseEventPoint(event)

		this.splitter.endPoint = mouseEventPoint
		this.drawing.redrawWithElements()
	}

	clickUp(event) {
		if (!isMainButton(event)) {
			return
		}

		const mouseEventPoint = getMouseEventPoint(event)

		this.splitter.endPoint = mouseEventPoint
		this.drawing.redrawWithElements()
		// TODO split !
	}
}
