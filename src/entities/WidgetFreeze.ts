import { Root } from "../pipelines/pipelineInit";
import { UiNumbers } from "./UiNumbers"
import { UiIcon } from "./UiIcon";
import * as THREE from 'three'

export class WidgetFreeze {
    mesh: THREE.Object3D
    _val: UiNumbers
    _icon: UiIcon
    _iconCoin: UiIcon
    clickArea: THREE.Mesh
    constructor ()  {}

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        this._val = new UiNumbers()
        await this._val.init(root)
        this._val.show('100')
        this._val.mesh.scale.set(.6, .6, .6)
        this._val.mesh.position.y = 0
        this._val.mesh.position.x = 15
        this.mesh.add(this._val.mesh)

        this._icon = new UiIcon()
        await this._icon.init(root)
        this._icon.show('frz')
        this._icon.mesh.position.y = 23
        this.mesh.add(this._icon.mesh)

        this._iconCoin = new UiIcon()
        await this._iconCoin.init(root)
        this._iconCoin.show('hand')
        this._iconCoin.mesh.scale.set(.6, .6, .6)
        this._iconCoin.mesh.position.y = 0
        this._iconCoin.mesh.position.x = -5
        this.mesh.add(this._iconCoin.mesh)

        this.clickArea = new THREE.Mesh(
            new THREE.PlaneGeometry(40, 40),
            new THREE.MeshBasicMaterial({ 
                color: 0xff0099,
                transparent: true,
                opacity: .3,
            })
        )
        this.clickArea.position.z = 5
        this.clickArea.position.x = 10
        this.clickArea.position.y = 30
        this.mesh.add(this.clickArea)
        this.clickArea.userData.userType = 'uiClick' 
        this.clickArea.userData.userName = 'uiClickFreeze'

        this.mesh.position.y = -230
        root.studio.onResize((r: any) => {
           this.mesh.position.x = r.rightX - 130
        })
    }

    setValue (val: number) {
        this._val.show(val + '')
    }
}