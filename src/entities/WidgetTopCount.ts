import * as THREE from 'three'

import { Root } from "../pipelines/root"
import { WidgetNumbers  } from './WidgetNumbers'

export class WidgetTopCount {
    mesh: THREE.Object3D
    coin: THREE.Mesh
    _widgetNumbers: WidgetNumbers

    constructor() {}

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        this.coin = new THREE.Mesh(
            root.assets.coinModel.scene.children[0].geometry,
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        )
        this.coin.scale.set(20, 20, 20)
        this.coin.rotation.x = Math.PI / 2
        this.coin.position.x = -25
        this.coin.position.y = 12

        this.mesh.add(this.coin)

        this._widgetNumbers = new WidgetNumbers()
        await this._widgetNumbers.init(root)
        this.mesh.add(this._widgetNumbers.mesh)
        this._widgetNumbers.show('12340986,+')
    }
}
