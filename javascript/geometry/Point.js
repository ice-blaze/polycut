export default class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	sub(point) {
		return new Point(
			this.x - point.x,
			this.y - point.y,
		)
	}

	divide(point) {
		return new Point(
			this.x / point.x,
			this.y / point.y,
		)
	}
}
