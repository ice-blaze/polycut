const elem = document.getElementById('canvasPlayArea')
const elemLeft = elem.offsetLeft
const elemTop = elem.offsetTop
const canvasWidth = elem.width
const canvasHeight = elem.height
const context = elem.getContext('2d')
context.fillStyle="#FF0000";
context.fillRect(0,0,canvasWidth,canvasHeight);

// Add event listener for `click` events.
elem.addEventListener('click', function(event) {
	const x = (event.pageX - elemLeft) / canvasWidth
	const y = (event.pageY - elemTop) / canvasHeight
	console.log(x + " " + y)
}, false);
