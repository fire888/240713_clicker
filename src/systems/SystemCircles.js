import * as THREE from 'three'
import { Coin } from '../entities/Coin'
import { CoinRed } from '../entities/CoinRed'
import { CoinCollision } from 'entities/CoinCollision'

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
            this.items[i].update()
            this.items[i].m.position.y -= 3
            //this.items[i].m.rotation.y += 0.01
            if (this.items[i].m.position.y < -300) {
                this.items[i].m.position.y = 300
                this.items[i].m.position.x = (Math.random() - .5) * 500
                if (this.items[i].type !== 'coinRed') {
                    this.items[i].m.material.color.set(0xbbbbbb)
                } else {
                    this.items[i].m.material.color.set(0xff0000)
                }
            }
            if (this.collisions[i]) { 
                this.collisions[i].m.position.copy(this.items[i].m.position)
            }
        }
    }

    breakCoin (id) {
        console.log(id, this.items[id])
        this.items[id].setColor(0x00ff00)
    }
}
