import MouseHandler from "./MouseHandler.js"
import TouchHandler from "./TouchHandler.js"

export default class EventHandler {
	constructor(canvasElement, canvas, splitPolygons) {
		this.pointConversion = canvas.pointConversion

		this.mouseHandler = new MouseHandler(canvasElement, canvas, splitPolygons)
		this.touchHandler = new TouchHandler(canvasElement, canvas, splitPolygons)
	}
}
