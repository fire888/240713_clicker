import * as THREE from 'three'

import { Root } from "../pipelines/pipelineInit"
import { UiNumbers  } from './UiNumbers'
import { UiIcon } from './UiIcon'
export class WidgetTopCount {
    mesh: THREE.Object3D
    _iconCoin: UiIcon
    _widgetNumbers: UiNumbers

    constructor() {}

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        this._iconCoin = new UiIcon()
        await this._iconCoin.init(root)
        this._iconCoin.show('hand')
        this._iconCoin.mesh.scale.set(.6, .6, .6)
        this._iconCoin.mesh.position.y = 0
        this._iconCoin.mesh.position.x = -25
        this.mesh.add(this._iconCoin.mesh)


        this._widgetNumbers = new UiNumbers()
        await this._widgetNumbers.init(root)
        this.mesh.add(this._widgetNumbers.mesh)
        this._widgetNumbers.mesh.scale.set(.6, .6, .6)
        this._widgetNumbers.show('12340986,+')
    }

    setValue (val: number) {
        this._widgetNumbers.show(val + '')
    }
}
