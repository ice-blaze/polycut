import Line from "../../geometry/Line.js"
import Point from "../../geometry/Point.js"

export default class Splitter extends Line {
	constructor() {
		super()
		this.startPoint = new Point(0,0)
		this.endPoint = new Point(0,0)
	}
}
