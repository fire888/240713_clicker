
import * as THREE from "three";

export class CoinCollision {
    static collisionMat = new THREE.MeshBasicMaterial({ color: 0xFF0000 }) 

    type: string = 'coinCollision'
    m: THREE.Mesh 

    constructor(root: any, name: string, type: string = 'coin') {
        const g = new THREE.PlaneGeometry(50, 70, 1, 1)

        this.m = new THREE.Mesh(g, CoinCollision.collisionMat)
        this.m.userData.userType = type
        this.m.userData.userName = name
        this.m.visible = false
    }
    update () {}
}
