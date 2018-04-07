const doesSlopeCollide = (ua, ub) => {
	const FLAT = 0
	const SLOPING = 1

	const seg1 = ua >= FLAT && ua <= SLOPING
	const seg2 = ub >= FLAT && ub <= SLOPING

	return seg1 && seg2
}

export default class Line {
	constructor(start, end) {
		this.start = start
		this.end = end
	}

	isIntersecting(line) {
		const denom = this.getDenom(line)

		const [ua, ub] = this.getUaUb(line, denom)
		if (doesSlopeCollide(ua, ub)) {
			const uaDiffX = ua * this.diffX()
			const uaDiffY = ua * this.diffY()

			return {
				x: this.start.x + uaDiffX,
				y: this.start.y + uaDiffY,
			}
		}

		return false
	}

	// Intersecting tools START
	diffX(line) {
		if (line) {
			return this.start.x - line.end.x
		}
		return this.end.x - this.start.x
	}

	diffStartX(line) {
		return this.start.x - line.start.x
	}

	diffY() {
		return this.end.y - this.start.y
	}

	diffStartY(line) {
		return this.start.y - line.start.y
	}

	getDenom(line) {
		const diff1 = line.diffY() * this.diffX()
		const diff2 = line.diffX() * this.diffY()

		const denom = diff1 - diff2

		const ERROR_DIV = 0
		if (denom === ERROR_DIV) {
			throw new Error("division by 0 in denom of a line")
		}

		return denom
	}

	getUaUb(line, denom) {
		const diff1 = line.diffX() * this.diffStartY(line)
		const diff2 = line.diffY() * this.diffStartX(line)
		const ua = (diff1 - diff2) / denom

		const diff3 = this.diffX() * this.diffStartY(line)
		const diff4 = this.diffY() * this.diffStartX(line)
		const ub = (diff3 - diff4) / denom

		return [ua, ub]
	}
	// Intersecting tools END
}
