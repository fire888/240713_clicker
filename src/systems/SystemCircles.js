import * as THREE from 'three'
import { Coin } from '../entities/Coin'
import { CoinRed } from '../entities/CoinRed'
import { CoinCollision } from 'entities/CoinCollision'
import * as TWEEN from '@tweenjs/tween.js'

export class SystemCircles {
    constructor () {}

    init (root) {
        this._root = root
        this.group = new THREE.Group()

        this.items = []
        this.collisions = []
        for (let i = 0; i < 30; ++i) {
            const coin = new Coin(root)
            coin.m.position.y = (Math.random() - .5) * 1000
            coin.m.position.x = (Math.random() - .5) * 500
            coin.m.position.z = -i * 35
            coin.savedZ = coin.m.position.z
            this.group.add(coin.m)

            this.items.push(coin)

            const collision = new CoinCollision(root, i)
            this.collisions.push(collision)
            this.group.add(collision.m)
        }

        this._coinRed = new CoinRed(root)
        this.items.push(this._coinRed)
        this.group.add(this._coinRed.m)

    }

    update () {
        for (let i = 0; i < this.items.length; ++i) {
            if (this.items[i].isTapped) {
                continue;
            }
            this.items[i].update()
            this.items[i].m.position.y -= 3
            if (this.items[i].m.position.y < -300) {
                this.resetItem(i)
            }
            if (this.collisions[i]) { 
                this.collisions[i].m.position.copy(this.items[i].m.position)
            }
        }
    }

    breakCoin (id) {
        const item = this.items[id]
        
        item.isTapped = true

        const obj = { ph: 0 }
        new TWEEN.Tween(obj)
            .easing(TWEEN.Easing.Circular.Out)
            .to({ ph: 1 }, 2000)
            .onUpdate(obj => {
                const v = (1 - obj.ph) * 30
                item.m.scale.set(v, v, v)
            })
            .onComplete(() => {
                this.resetItem(id)
            })
            .start()
    }

    resetItem (id) {
        this.items[id].m.position.y = 300
        this.items[id].m.position.x = (Math.random() - .5) * 500
        this.items[id].m.position.z = this.items[id].savedZ
        this.items[id].m.scale.set(30, 7, 30)
        this.items[id].isTapped = false
        this.items[id].m.material.color.set(0xbbbbbb)
    }
}
