import * as THREE from 'three'
import { Root } from "pipelines/root"
import { WidgetBar } from "./WidgetBar"
import { WidgetNumbers } from './WidgetNumbers'
import { WidgetIcon } from './WidgetIcon'




export class WidgetTimer {
    mesh: THREE.Object3D
    _bar: WidgetBar
    _val: WidgetNumbers
    _icon: WidgetIcon

    constructor () {}

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        this._bar = new WidgetBar()
        await this._bar.init(root)
        this.mesh.add(this._bar.mesh)

        this._icon = new WidgetIcon()
        await this._icon.init(root)
        this._icon.show('light')
        this._icon.mesh.position.y = 50
        this.mesh.add(this._icon.mesh)

        this._val = new WidgetNumbers()
        await this._val.init(root)
        this._val.show('123')
        this._val.mesh.position.y = 50
        this._val.mesh.position.x = 50
        this.mesh.add(this._val.mesh)
    }
}