import * as THREE from 'three'

export class BoxTest {
    constructor () {}

    init () {
        const g = new THREE.BoxGeometry(30, 30, 30)
        const m = new THREE.MeshPhongMaterial({ color: 0xff0000 })
        this.mesh = new THREE.Mesh(g, m)
    }
}
