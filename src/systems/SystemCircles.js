import * as THREE from 'three'
import { Coin } from '../entities/Coin'
import { CoinRed } from '../entities/CoinRed'
import * as TWEEN from '@tweenjs/tween.js'
import { COIN_STATES } from 'constants/constants'

export class SystemCircles {
    constructor () {}

    init (root) {
        this._root = root

        this._defaultAppearSpeedCoins = 7
        this._fastAppearSpeedCoins = 35
        this._speedAppearCoinInSecond = this._defaultAppearSpeedCoins
        this._isApperGoldenCoins = false

        this._isUpdate = false
        this._savedTimeAppear = 0

        this._speedYNormal = -4
        this._speedYSlow = -1
        this._speedYCurrent = this._speedYNormal

        this._yTop = 250
        this._yTopGolden = -200
        this._yBottom = -250

        this.items = {}
        for (let i = 0; i < 100; ++i) {
            const coin = new Coin(root)
            coin.setPosition(
                (Math.random() - .5) * 500,
                this._yTop,
                -i * 1,
            )
            coin.addToScene()
            this.items[coin.id] = coin
        }

    }

    update () {
        if (!this._isUpdate) {
            return;
        }

        // add random falling
        const time = Date.now()
        if (time - this._savedTimeAppear > 1000 / this._speedAppearCoinInSecond) {
            this._savedTimeAppear = time
            const arr = []
            for (let key in this.items) {
                if (this.items[key].state === COIN_STATES.readyToFall) {
                    arr.push(key)                    
                }
            }

            if (arr.length > 0) {
                const id = arr[Math.floor(Math.random() * arr.length)]
                this.items[id].state = COIN_STATES.fallingProcess
                if (this._isApperGoldenCoins) {
                    this.items[id].setColor(0xffff00)
                }
            }
        }

        for (let key in this.items) {
            if (this.items[key].state !== COIN_STATES.fallingProcess) {
                continue;
            }
            this.items[key].updateRotation()
            this.items[key].addToPositionY(this._speedYCurrent)

            if (this.items[key].m.position.y < this._yBottom) {
                this.resetItem(key)
            }
        }
    }

    breakCoin (id) {
        const item = this.items[id]
        
        const obj = { ph: 0 }
        new TWEEN.Tween(obj)
            .easing(TWEEN.Easing.Circular.Out)
            .to({ ph: 1 }, 2000)
            .onUpdate(obj => {
                const v = (1 - obj.ph) * 30
                item.m.scale.set(v, v * .1, v)
            })
            .onComplete(() => {
                this.resetItem(id)
            })
            .start()
    }

    resetItem (id) {
        this.items[id].setPositionY(this._yTop)
        this.items[id].setPositionX((Math.random() - .5) * 500)
        this.items[id].state = COIN_STATES.readyToFall
        this.items[id].m.scale.set(30, 30 * 0.1, 30)
        this.items[id].setColor(0xbbbbbb)
    }

    stop () {
        this._isUpdate = false
    }

    start () {
        this._isUpdate = true
    }

    makeSpeedSlow () {
        this._speedYCurrent = this._speedYSlow
    }

    makeSpeedNormal () {
        this._speedYCurrent = this._speedYNormal
    }

    startMoreCoins () {
        this._speedAppearCoinInSecond = this._fastAppearSpeedCoins
        this._isApperGoldenCoins = true
    }

    stopMoreCoins () {
        this._speedAppearCoinInSecond = this._defaultAppearSpeedCoins
        this._isApperGoldenCoins = false
    }
 }
