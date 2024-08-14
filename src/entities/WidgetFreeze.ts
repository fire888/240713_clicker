import { Root } from "pipelines/root";
import { UiNumbers } from "./UiNumbers"
import { UiIcon } from "./UiIcon";
import * as THREE from 'three'

export class WidgetFreeze {
    mesh: THREE.Object3D
    _val: UiNumbers
    _icon: UiIcon
    constructor ()  {}

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        this._val = new UiNumbers()
        await this._val.init(root)
        this._val.show('100')
        this._val.mesh.position.y = -10
        this.mesh.add(this._val.mesh)

        this._icon = new UiIcon()
        await this._icon.init(root)
        this._icon.show('frz')
        this._icon.mesh.position.y = 50
        this.mesh.add(this._icon.mesh)
    }
}