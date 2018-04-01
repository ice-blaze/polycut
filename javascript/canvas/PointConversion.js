export default class PointConversion {
	constructor(canvas) {
		this.widthHeight = canvas.widthHeight
	}

	convertPixelPointToPercentagePoint (pixelPoint) {
		return pixelPoint.divide(this.widthHeight)
	}

	convertPercentagePointToPixelPoint (pixelPercentage) {
		return pixelPercentage.multiply(this.widthHeight)
	}
}
