import * as THREE from 'three'

import { Root } from "index"

export class WidgetTopCount {
    mesh: THREE.Object3D
    coin: THREE.Mesh

    constructor() {}

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        this.coin = new THREE.Mesh(
            root.assets.coinModel.scene.children[0].geometry,
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        )
        this.coin.scale.set(30, 7, 30)
        this.coin.rotation.x = Math.PI / 2
        this.coin.position.x = -50
        this.coin.position.y = 200

        this.mesh.add(this.coin)
    }
}
