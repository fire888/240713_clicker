import * as THREE from "three";

export class Coin {
    constructor(root) {
        //const g = new THREE.CylinderGeometry(30, 30, 2)
        const g = root.assets.coinModel.scene.children[0].geometry
        const m = new THREE.MeshPhongMaterial({ color: 0xff0000 })

        this.m = new THREE.Mesh(g, m)
        this.m.scale.set(30, 7, 30)

        this.m.rotation.x = Math.PI / 2

        this._yRotSpeed = (Math.random() - .5) * 0.1
        this._zRotSpeed = (Math.random() - .5) * 0.1
    }

    update () {
        this.m.rotation.x += this._yRotSpeed
        this.m.rotation.z += this._zRotSpeed
    }
}
