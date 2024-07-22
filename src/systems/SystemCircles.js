import * as THREE from 'three'

export class SystemCircles {
    constructor () {}

    init () {
        const g = new THREE.CircleGeometry(30, 24)


        this.group = new THREE.Group()

        this.items = []
        for (let i = 0; i < 30; ++i) {
            const m = new THREE.MeshPhongMaterial({ color: 0xff0000 })
            const mesh = new THREE.Mesh(g, m)
            this.items.push(mesh)
            mesh.position.y = (Math.random() - .5) * 300
            mesh.position.x = (Math.random() - .5) * 300
            this.group.add(mesh)
        }
    }

    update () {
        for (let i = 0; i < this.items.length; ++i) {
            this.items[i].position.y -= 3
            if (this.items[i].position.y < -300) {
                this.items[i].position.y = 300
                this.items[i].material.color.set(0xff0000)
            }
        }
    }
}
