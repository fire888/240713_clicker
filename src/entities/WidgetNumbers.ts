import * as THREE from 'three'
import { Root } from '../pipelines/root'


export class WidgetNumbers {
    static _geoms: any
    private _mat: THREE.MeshBasicMaterial
    private _meshes: THREE.Mesh[]
    mesh: THREE.Object3D


    constructor () {}

    async init (root: Root) {    
        if (!WidgetNumbers._geoms) {
            const verticies = [
                0, 0, 0,
                10, 0, 0,
                10, 30, 0,
                0, 0, 0,
                10, 30, 0,
                0, 30, 0,
            ]
            const vF32 = new Float32Array(verticies)
    
            const keys = ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a,' , 'a+']
            WidgetNumbers._geoms = {}
    
            const stepX = 1 / keys.length
            for (let i = 0; i < keys.length; ++i) {
                const arr: number[] = [
                    stepX * i, 0, 0,
                    stepX * i + stepX, 0, 0,
                    stepX * i + stepX, 1, 0,
                    stepX * i, 0, 0,
                    stepX * i + stepX, 1, 0,
                    stepX * i, 1, 0,
                ]
                const arrUV = new Float32Array(arr)
                const geom = new THREE.BufferGeometry()
                geom.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
                geom.setAttribute('uv', new THREE.BufferAttribute(arrUV, 3))
                WidgetNumbers._geoms[keys[i]] = geom
            }
        }

        this._mat = new THREE.MeshBasicMaterial({ 
            color: 0xFF0000, 
            transparent: true,
            alphaMap: root.assets.textureNumbersMask
        })


        this._meshes = []
        this.mesh = new THREE.Object3D()
    }

    show (val: string) {
        for (let i = 0; i < this._meshes.length; ++i) {
            this.mesh.remove(this._meshes[i])
            delete this._meshes[i]
        }
        this._meshes = []

        for (let i = 0; i < val.length; ++i) {
            console.log(val[i])
            const m = new THREE.Mesh(
                WidgetNumbers._geoms['a'+ val[i]],
                this._mat
            )
            this._meshes.push(m)
            this.mesh.add(m)
            m.position.x = i * 10
        }
    }
}