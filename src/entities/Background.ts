import { Root } from "pipelines/pipelineInit";
import * as THREE from "three";

export class Background {
    type: string = 'back'
    m: THREE.Mesh

    constructor() {
    }

    init (root: Root) {

        const w = 1
        const h = 1
        const g = new THREE.PlaneGeometry(w, h)

        const m = new THREE.MeshPhongMaterial({ 
            //color: 0xbbbbbb, 
            //map: root.assets.textureNoise, 
            color: 0x222222,
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
        this.m.scale.y = root.studio.frustumSize

        root.studio.onResize((r: any) => {
            this.m.scale.x = r.ratio * r.frustumSize
        })
        
        //this.m.scale.set(30, 7, 30)

        //this.m.rotation.x = Math.PI / 2
    }

    update () {
        //this.m.rotation.x += this._xRotSpeed
        //this.m.rotation.z += this._zRotSpeed
    }
}
