import Drawing from "./Drawing.js"
import EventHandler from "./eventHandler/EventHandler.js"
import Point from "../geometry/Point.js"
import PointConversion from "./PointConversion.js"
import Splitter from "./splitter/Splitter.js"

export default class Canvas {
	constructor(canvasId, polygons) {
		const elem = document.getElementById(canvasId)
		this.topLeft = new Point(elem.offsetLeft, elem.offsetTop)
		this.widthHeight = new Point(elem.width, elem.height)
		this.context = elem.getContext("2d")
		this.addEventListener = elem.addEventListener

		this.pointConversion = new PointConversion(this.widthHeight)
		this.splitter = new Splitter(this.context, this.drawing)
		this.drawing = new Drawing(this, polygons)
		this.eventHandler = new EventHandler(elem, this, polygons)
	}
}
