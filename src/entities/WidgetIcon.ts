import * as THREE from 'three'
import { Root } from "pipelines/root"

type KeysToShow = "hand" | "lightInArrow" | "light" | "halfCircle" | "empty" | "frz" | "yellow" | 'boom'

export class WidgetIcon {
    mesh: THREE.Mesh 
    root: Root
    constructor () {}

    async init (root: Root) {
        this.root = root
    }

    show (key: KeysToShow) {
        const verticies = [
            0, 0, 0,
            30, 0, 0,
            30, 30, 0,
            0, 0, 0,
            30, 30, 0,
            0, 30, 0,
        ]
        const vF32 = new Float32Array(verticies)

        const offset = {
            'hand': 0,
            'lightInArrow': 1,
            'light': 2,
            'halfCircle': 3,
            'empty': 4,
            'frz': 5,
            'yellow': 6,
            'boom': 7,
        }

        const step = 1 / 8
        const i = step * offset[key]

        const uv = [
            i, 0,   
            i + step, 0,   
            i + step, 1,   
            i, 0,   
            i + step, 1,   
            i, 1,   
        ]
        const uvF32 = new Float32Array(uv)

        const geom = new THREE.BufferGeometry()
        geom.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
        geom.setAttribute('uv', new THREE.BufferAttribute(uvF32, 2))

        this.mesh = new THREE.Mesh(
            geom,
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                map: this.root.assets.iconsMap,
                alphaMap: this.root.assets.iconsMask,
                transparent: true,
                opacity: 1,
            })
        )
    }
}