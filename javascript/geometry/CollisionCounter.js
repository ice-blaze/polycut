export default class CollisionCounter {
	constructor() {
		this.counter = 0
	}

	increment() {
		this.counter += 1
	}

	isEven() {
		const EVEN = 2
		if (this.counter % EVEN) {
			throw new Error("Collisions number is not even.")
		}
	}
}
