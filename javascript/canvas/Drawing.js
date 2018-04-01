import DrawPolygons from "../geometry/DrawPolygons.js"
import DrawSplitter from "./splitter/DrawSplitter.js"

export default class Drawing {
	constructor(canvas, polygons) {
		this.context = canvas.context
		this.pointConversion = canvas.pointConversion
		this.widthHeight = canvas.widthHeight
		this.drawPolygons = new DrawPolygons(
			this.context,
			this.pointConversion
		)
		this.drawSplitter = new DrawSplitter(this.context)
		this.polygons = polygons
		this.splitter = canvas.splitter
	}

	// maybe in another file
	drawBackground() {
		this.context.fillStyle="#FF0000";
		this.context.fillRect(0,0,this.widthHeight.x,this.widthHeight.y);
	}

	redrawWithElements () {
		this.drawBackground()
		this.drawPolygons.draw(this.polygons)
		this.drawSplitter.draw(this.splitter)
	}
}
