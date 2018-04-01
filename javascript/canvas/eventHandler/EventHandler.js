import MouseHandler from "./MouseHandler.js"
import TouchHandler from "./TouchHandler.js"

export default class EventHandler {
	constructor(canvasElement, pointConversion, splitter) {
		this.pointConversion = pointConversion

		this.mouseHandler = new MouseHandler(canvasElement, pointConversion, splitter)
		this.touchHandler = new TouchHandler(canvasElement, pointConversion, splitter)
	}
}
