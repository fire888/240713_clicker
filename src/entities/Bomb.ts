import * as THREE from "three";
import { Root } from "pipelines/pipelineInit";
import * as TWEEN from "@tweenjs/tween.js"


export class Bomb {
    m: THREE.Mesh
    private _root: Root

    constructor() {


    }

    init (root: Root) {
        this._root = root
        
        const g = new THREE.CircleGeometry(10, 32, 32)
        const m = new THREE.MeshPhongMaterial({ 
            //color: 0xbbbbbb, 
            //map: root.assets.textureNoise, 
            color: 0xff0000,
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
        this.m.visible = false
        //this.m.scale.set(30, 9, 30)
    }

    updateRotation () {
    }


    addToScene () {
        this._root.studio.add(this.m)
    }

    setPosition (x: number, y: number, z: number) {
        this.m.position.set(x, y, z)
    }

    setPositionX (x: number) {
        this.m.position.x = x
    }

    setPositionY (y: number) {
        this.m.position.y = y
    }

    addToPositionY (speedY: number) {
        this.m.position.y += speedY
    }

    setPositionZ (z: number) {
        this.m.position.z = z
    }

    animateFly (from: number[] = [200, -200, 0], to: number[] = [0, 0, 0], duration: number = 1000) {
        this.m.visible = true

        this.m.position.set(from[0], from[1], from[2])
        const tween = new TWEEN.Tween(this.m.position)
            .to({ x: to[0], y: to[1], z: to[2] }, duration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onComplete(() => this.m.visible = false)
            .start()
    }
}
