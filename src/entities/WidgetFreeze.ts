import { Root } from "pipelines/root";
import { WidgetNumbers } from "./WidgetNumbers"
import { WidgetIcon } from "./WidgetIcon";
import * as THREE from 'three'

export class WidgetFreeze {
    mesh: THREE.Object3D
    _val: WidgetNumbers
    _icon: WidgetIcon
    constructor ()  {}

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        this._val = new WidgetNumbers()
        await this._val.init(root)
        this._val.show('100')
        this._val.mesh.position.y = -10
        this.mesh.add(this._val.mesh)

        this._icon = new WidgetIcon()
        await this._icon.init(root)
        this._icon.show('frz')
        this._icon.mesh.position.y = 50
        this.mesh.add(this._icon.mesh)
    }
}