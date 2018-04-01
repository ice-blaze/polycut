export default class PointConversion {
	constructor(widthHeight) {
		this.widthHeight = widthHeight
	}

	convertPixelPointToPercentagePoint (pixelPoint) {
		return pixelPoint.divide(this.widthHeight)
	}

	convertPercentagePointToPixelPoint (pixelPercentage) {
		return pixelPercentage.multiply(this.widthHeight)
	}
}
