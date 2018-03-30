import Canvas from "./canvas/Canvas.js"
import Polygons from "./geometry/Polygons.js"
import Polygon from "./geometry/Polygon.js"
import * as TypeCheck from "./tools/TypeCheck.js"

const canvasId = "canvasPlayArea"
const canvas = new Canvas(canvasId)

const tangram = new Polygons()
canvas.drawing.redrawWithElements(tangram)
