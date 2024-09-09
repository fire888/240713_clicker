import { Root } from "../pipelines/pipelineInit";
import { UiNumbers } from "./UiNumbers"
import { UiIcon } from "./UiIcon";
import * as THREE from 'three'

export class WidgetAddEnergy {
    mesh: THREE.Object3D
    _val: UiNumbers
    _iconH: UiIcon
    _iconL: UiIcon
    _popup: THREE.Mesh
    constructor ()  {}

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        this._popup = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 75),
            new THREE.MeshBasicMaterial({ 
                color: 0x000099,
                transparent: true,
                alphaMap: root.assets.popupMapMask
            })
        )
        this._popup.position.z = -5
        this.mesh.add(this._popup)

        this._iconL = new UiIcon()
        await this._iconL.init(root)
        this._iconL.show('lightInArrow')
        this._iconL.mesh.position.x = -40
        this._iconL.mesh.position.y = 5
        this._iconL.mesh.scale.set(.6, .6, .6)
        this.mesh.add(this._iconL.mesh)

        this._iconH = new UiIcon()
        await this._iconH.init(root)
        this._iconH.show('hand')
        this._iconH.mesh.scale.set(.6, .6, .6)
        this._iconH.mesh.position.x = -15
        this._iconH.mesh.position.y = 5
        this.mesh.add(this._iconH.mesh)

        this._val = new UiNumbers()
        await this._val.init(root)
        this._val.show('100')
        this._val.mesh.scale.set(.6, .6, .6)
        this._val.mesh.position.x = 15
        this._val.mesh.position.y = 5
        this.mesh.add(this._val.mesh)
    }
}