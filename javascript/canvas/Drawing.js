export default class Drawing {
	constructor(canvas) {
		this.context = canvas.context
		this.widthHeight = canvas.widthHeight
	}

	drawBackground() {
		this.context.fillStyle="#FF0000";
		this.context.fillRect(0,0,this.widthHeight.x,this.widthHeight.y);
	}

	redrawWithElements () {
		this.drawBackground()
		// draw elements
	}
}
