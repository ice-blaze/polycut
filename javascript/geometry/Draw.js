
export default class Draw {
	constructor(context, points, pointConversion) {
		this.context = context
		this.points = points
		this.pointConversion = pointConversion
	}

	moveTo(point) {
		const canvasPoint = this.pointConversion.convertPercentageToCanvas(point)
		this.context.moveTo(
			canvasPoint.x,
			canvasPoint.y,
		);
	}

	lineTo(point) {
		const canvasPoint = this.pointConversion.convertPercentageToCanvas(point)
		this.context.lineTo(
			canvasPoint.x,
			canvasPoint.y,
		);
	}

	getFirstPoint() {
		const FIRST_ELEMENT = 0
		return this.points[FIRST_ELEMENT]
	}

	getPointsWithoutFirstOne() {
		const IGNORE_FIRST_ELEMENT = 1
		return this.points.slice(IGNORE_FIRST_ELEMENT)
	}

	draw() {
		this.context.fillStyle = "#0f0";
		this.context.beginPath();
		this.moveTo(this.getFirstPoint())
		this.getPointsWithoutFirstOne().forEach(point => {
			this.lineTo(point)
		})
		this.context.closePath();
		this.context.fill();
	}
}
