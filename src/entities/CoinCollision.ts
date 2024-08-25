
import * as THREE from "three";

export class CoinCollision {
    static collisionMat = new THREE.MeshBasicMaterial({ color: 0xFF0000 }) 

    type: string = 'coinCollision'
    m: THREE.Mesh 

    constructor(root: any) {
        const g = new THREE.PlaneGeometry(20, 20, 1, 1)

        this.m = new THREE.Mesh(g, CoinCollision.collisionMat)
    }
    update () {}
}
