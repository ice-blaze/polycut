export default class PointConversion {
	constructor(canvas) {
		this.topLeft = canvas.topLeft
		this.widthHeight = canvas.widthHeight
	}

	convertWorldPointToCanvasPixelPoint(worldClickPoint) {
		return worldClickPoint.sub(this.topLeft)
	}

	convertPixelPointToPercentagePoint (pixelPoint) {
		return pixelPoint.divide(this.widthHeight)
	}

	convertWorldPointToPercentagePoint(worldClickPoint) {
		const canvasPoint = this.convertWorldPointToCanvasPixelPoint(worldClickPoint)
		const percentagePoint = this.convertPixelPointToPercentagePoint(canvasPoint)
		return percentagePoint
	}
}
