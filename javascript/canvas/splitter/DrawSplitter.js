const drawLine = (context, startPoint, endPoint) => {
	context.fillStyle = "#00f";
	context.beginPath();
	context.moveTo(
		startPoint.x, startPoint.y
	)
	context.lineTo(
		endPoint.x, endPoint.y
	)
	context.stroke();
	context.fill();
}

export default class DrawSplitter {
	constructor(context) {
		this.context = context
	}

	draw(splitter) {
		drawLine(this.context, splitter.startPoint, splitter.endPoint)
	}
}
