import * as THREE from 'three'
import { Root } from "../pipelines/pipelineInit";
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
        this._bar.mesh.position.y = 0 

        this._icon = new UiIcon()
        await this._icon.init(root)
        this._icon.show('light')
        this._icon.mesh.position.y = 12
        this._icon.mesh.position.x = 20
        this._icon.mesh.scale.set(.6, .6, .6)
        this.mesh.add(this._icon.mesh)

        this._val = new UiNumbers()
        await this._val.init(root)
        this._val.show('123')
        this._val.mesh.position.y = 12
        this._val.mesh.position.x = 43
        this._val.mesh.scale.set(.6, .6, .6)
        this.mesh.add(this._val.mesh)
    }

    setValue (val: number) {
        this._bar.setValue(val)
    }
}