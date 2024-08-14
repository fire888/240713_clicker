import * as THREE from 'three'
import { Root } from "pipelines/root"
import { UiBar } from "./UiBar"
import { UiNumbers } from './UiNumbers'
import { UiIcon } from './UiIcon'




export class WidgetTimer {
    mesh: THREE.Object3D
    _bar: UiBar
    _val: UiNumbers
    _icon: UiIcon

    constructor () {}

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        this._bar = new UiBar()
        await this._bar.init(root)
        this.mesh.add(this._bar.mesh)

        this._icon = new UiIcon()
        await this._icon.init(root)
        this._icon.show('light')
        this._icon.mesh.position.y = 50
        this.mesh.add(this._icon.mesh)

        this._val = new UiNumbers()
        await this._val.init(root)
        this._val.show('123')
        this._val.mesh.position.y = 50
        this._val.mesh.position.x = 50
        this.mesh.add(this._val.mesh)
    }
}