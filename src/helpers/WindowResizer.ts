export class WindowResizer {
    _arrFunctions: any[]
    w: number
    h: number
    ratio: number
    constructor () {
        this._arrFunctions = []

        this.w = window.innerWidth
        this.h = window.innerHeight
        this.ratio = this.w / this.h

        window.addEventListener('resize', () => {
            this.resize()
        })
    } 

    on (fn: any): any {
        this._arrFunctions.push(fn)
        return () => {  
            this._arrFunctions = this._arrFunctions.filter(f => f !== fn)
        }
    }

    resize () {
        this.w = window.innerWidth
        this.h = window.innerHeight
        this.ratio = this.w / this.h
        this._arrFunctions.forEach(fn => fn(this))
    }
}