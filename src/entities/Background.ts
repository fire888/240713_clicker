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
            color: 0x220022,
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

        this.m.position.z = -3000
        root.studio.onResize((r: any) => {
            this.m.scale.x = r.ratio * r.frustumSize
        })
    }

    setFreezeMode () {
        // @ts-ignore: Unreachable code error
        this.m.material.color.set(0x000088)
    }

    removeFreezeMode() {
        // @ts-ignore: Unreachable code error
        this.m.material.color.set(0x220022)
    }
}
