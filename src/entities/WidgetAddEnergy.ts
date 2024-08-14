import { Root } from "pipelines/root";
import { UiNumbers } from "./UiNumbers"
import { UiIcon } from "./UiIcon";
import * as THREE from 'three'

export class WidgetAddEnergy {
    mesh: THREE.Object3D
    _val: UiNumbers
    _icon: UiIcon
    _popup: THREE.Mesh
    constructor ()  {}

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        this._popup = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 150),
            new THREE.MeshBasicMaterial({ 
                color: 0x000099,
                transparent: true,
                alphaMap: root.assets.popupMapMask
            })
        )
        this._popup.position.z = -5
        this.mesh.add(this._popup)



        this._icon = new UiIcon()
        await this._icon.init(root)
        this._icon.show('lightInArrow')
        this._icon.mesh.position.x = -50
        this._icon.mesh.position.y = 15
        this.mesh.add(this._icon.mesh)

        this._icon = new UiIcon()
        await this._icon.init(root)
        this._icon.show('hand')
        this._icon.mesh.position.x = 0
        this._icon.mesh.position.y = 15
        this.mesh.add(this._icon.mesh)

        this._val = new UiNumbers()
        await this._val.init(root)
        this._val.show('100')
        this._val.mesh.position.x = 50
        this._val.mesh.position.y = 15
        this.mesh.add(this._val.mesh)
    }
}