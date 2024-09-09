import * as THREE from "three";

export class Coin {
    type: string = 'coin'
    m: THREE.Mesh
    readonly _xRotSpeed: number = (Math.random() - .5) * 0.1
    readonly _zRotSpeed: number = (Math.random() - .5) * 0.1
    isTapped: boolean = false

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

        this.m = new THREE.Mesh(g, m)
        this.m.scale.set(30, 30, 30)
        this.m.rotation.x = Math.PI / 2
    }

    update () {
        this.m.rotation.x += this._xRotSpeed
        this.m.rotation.z += this._zRotSpeed
    }

    setColor (color: number) {
        // @ts-ignore: Unreachable code error
        this.m.material.color.set(color)
    }
}
