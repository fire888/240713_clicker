import { Root } from "pipelines/pipelineInit";
import * as THREE from "three";

export class TopEffect {
    type: string = 'top'
    m: THREE.Object3D
    mFreeze: THREE.Mesh
    mYellow: THREE.Mesh
    mRed: THREE.Mesh
    private _root: Root

    constructor() {
    }

    init (root: Root) {
        this._root = root

        const w = 1
        const h = 1

        this.m = new THREE.Object3D()


        const g = new THREE.PlaneGeometry(w, h)
        const mG = new THREE.MeshPhongMaterial({ 
            //color: 0xbbbbbb, 
            //map: root.assets.textureNoise, 
            color: 0x999999,
            //emissive: 0x7795d3,
            specular: 0xffffff,
            shininess: 100,
            //envMap: envMap,
            bumpMap:  root.assets.textureNoise,
            bumpScale: 1,
            reflectivity: 1,
            transparent: true,
            alphaMap: root.assets.freezeMapMask,
            //opacity: 0.8,
        })

        this.mFreeze = new THREE.Mesh(g, mG)
        this.m.add(this.mFreeze)
        this.mFreeze.visible = false

        const mY = new THREE.MeshPhongMaterial({ 
            //color: 0xbbbbbb, 
            //map: root.assets.textureNoise, 
            color: 0x999900,
            //emissive: 0x7795d3,
            specular: 0xffffff,
            shininess: 100,
            //envMap: envMap,
            bumpMap:  root.assets.textureNoise,
            bumpScale: 1,
            reflectivity: 1,
            transparent: true,
            alphaMap: root.assets.circleMapMask,
            //opacity: 0.8,
        })

        this.mYellow = new THREE.Mesh(g, mY)
        this.m.add(this.mYellow)
        this.mYellow.visible = false


        const mR = new THREE.MeshPhongMaterial({ 
            //color: 0xbbbbbb, 
            //map: root.assets.textureNoise, 
            color: 0x990000,
            //emissive: 0x7795d3,
            specular: 0xffffff,
            shininess: 100,
            //envMap: envMap,
            bumpMap:  root.assets.textureNoise,
            bumpScale: 1,
            reflectivity: 1,
            transparent: true,
            alphaMap: root.assets.circleMapMask,
            //opacity: 0.8,
        })

        this.mRed = new THREE.Mesh(g, mR)
        this.m.add(this.mRed)
        this.mRed.visible = false



        this.m.scale.y = root.studio.frustumSize
        root.studio.onResize((r: any) => {
            this.m.scale.x = r.ratio * r.frustumSize
        })
        //this.m.visible = false
        
        //this.m.scale.set(30, 7, 30)

        //this.m.rotation.x = Math.PI / 2
    }

    setFreezeMode () {
        this.mFreeze.visible = true
    }

    removeFreezeMode() {
        this.mFreeze.visible = false
    }

    setYellowMode () {
        this.mYellow.visible = true
    }

    removeYellowMode () {
        this.mYellow.visible = false
    }

    setRedMode () {
        this.mRed.visible = true
    }

    removeRedMode () {
        this.mRed.visible = false
    }
}
