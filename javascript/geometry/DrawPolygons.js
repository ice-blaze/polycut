import DrawPolygon from "./DrawPolygon.js"

export default class DrawPolygons {
	constructor(context, pointConversion) {
		this.context = context
		this.pointConversion = pointConversion
		this.drawPolygon = new DrawPolygon(context, pointConversion)
	}

	draw(polygons) {
		polygons.polygons.forEach(polygon => {
			this.drawPolygon.draw(polygon)
		})
	}
}
