import * as THREE from "three";

export class CoinCollision {
    static mat = new THREE.MeshBasicMaterial({ color: 0xFF0000 }) 
    static geom = new THREE.PlaneGeometry(50, 70, 1, 1)

    type: string = 'coinCollision'
    m: THREE.Mesh 

    constructor () {
        this.m = new THREE.Mesh(CoinCollision.geom, CoinCollision.mat)
        //this.m.visible = false
    }
    update () {}
}


