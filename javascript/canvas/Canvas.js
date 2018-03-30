import Point from "../geometry/Point.js"
import PointConversion from "./PointConversion.js"
import Drawing from "./Drawing.js"

export default class Canvas {
	constructor(canvasId) {
		const elem = document.getElementById(canvasId)
		this.topLeft = new Point(elem.offsetLeft, elem.offsetTop)
		this.widthHeight = new Point(elem.width, elem.height)
		this.context = elem.getContext('2d')

		// need inner function to keep this(class) in clickEvent function...
		elem.addEventListener('click', (e) => {return this.clickEvent(e)}, false)

		this.pointConversion = new PointConversion(this)
		this.drawing = new Drawing(this)
	}

	clickEvent(event) {
		const worldClickPoint = new Point(event.pageX, event.pageY)
		const percentagePoint = this.pointConversion.convertWorldPointToPercentagePoint(
			worldClickPoint
		)

		console.log(percentagePoint.x + " " + percentagePoint.y)
	}
}
