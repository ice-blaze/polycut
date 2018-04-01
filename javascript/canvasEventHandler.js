import Canvas from "./canvas/Canvas.js"
import Polygons from "./geometry/Polygons.js"

const canvasId = "canvasPlayArea"

const tangram = new Polygons()
const canvas = new Canvas(canvasId, tangram)

canvas.drawing.redrawWithElements()
