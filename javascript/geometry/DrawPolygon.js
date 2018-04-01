const getFirstPoint = (points) => {
	const FIRST_ELEMENT = 0
	return points[FIRST_ELEMENT]
}

const getPointsWithoutFirstOne = (points) => {
	const IGNORE_FIRST_ELEMENT = 1
	return points.slice(IGNORE_FIRST_ELEMENT)
}

export default class DrawPolygon {
	constructor(context, pointConversion) {
		this.context = context
		this.pointConversion = pointConversion
	}

	moveTo(point) {
		const canvasPoint = this.pointConversion.convertPercentagePointToPixelPoint(point)
		this.context.moveTo(
			canvasPoint.x,
			canvasPoint.y,
		);
	}

	lineTo(point) {
		const canvasPoint = this.pointConversion.convertPercentagePointToPixelPoint(point)
		this.context.lineTo(
			canvasPoint.x,
			canvasPoint.y,
		);
	}

	draw(polygon) {
		const points = polygon.points

		this.context.fillStyle = "#0f0";
		this.context.beginPath();
		this.moveTo(getFirstPoint(points))
		getPointsWithoutFirstOne(points).forEach(point => {
			this.lineTo(point)
		})
		this.context.closePath();
		this.context.fill();
	}
}
