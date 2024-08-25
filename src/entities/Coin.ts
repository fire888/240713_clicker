import * as THREE from "three";

export class Coin {
    type: string = 'coin'
    m: THREE.Object3D
    mView: THREE.Mesh
    collisionMesh: THREE.Mesh 
    readonly _xRotSpeed: number = (Math.random() - .5) * 0.1
    readonly _zRotSpeed: number = (Math.random() - .5) * 0.1

    static collisionMat = new THREE.MeshBasicMaterial({ color: 0xFF0000 }) 

    constructor(root: any) {
        const g = root.assets.coinModel.scene.children[0].geometry
        const m = new THREE.MeshPhongMaterial({ 
            //color: 0xbbbbbb, 
            //map: root.assets.textureNoise, 
            color: 0xbbbbbb,
            //emissive: 0x7795d3,
            specular: 0xffffff,
            shininess: 100,
            //envMap: envMap,
            bumpMap:  root.assets.textureNoise,
            bumpScale: 1,
            reflectivity: 1,
            //transparent: true,
            //opacity: 0.8,
        })

        this.m = new THREE.Object3D()

        this.mView = new THREE.Mesh(g, m)
        this.mView.scale.set(30, 7, 30)
        this.mView.rotation.x = Math.PI / 2
        this.m.add(this.mView)

        this.collisionMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(30, 30),
            Coin.collisionMat,
        )

        this.m.add(this.collisionMesh)
    }

    update () {
        this.mView.rotation.x += this._xRotSpeed
        this.mView.rotation.z += this._zRotSpeed
    }

    setColor (color: number) {
        // @ts-ignore: Unreachable code error
        this.mView.material.color.set(0xbbbbbb)
    }
}
