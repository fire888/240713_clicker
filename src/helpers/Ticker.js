export class Ticker {
    constructor() {
        this.updates = []
        this.isRunning = false

        this._prevTime = Date.now()
    }

    start () {
        this.isRunning = true
        this.tick()
    }

    tick () {
        if (!this.isRunning) {
            return
        }

        const now = Date.now()

        requestAnimationFrame(this.tick.bind(this))
        for (let i = 0; i < this.updates.length; ++i) {
            this.updates[i]()
        }

        this._prevTime = now
    }

    on (f) {
        this.updates.push(f)
        return () => {
            this.updates = this.updates.filter(item => item !== f)
        }
    }
}
