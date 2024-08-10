import * as THREE from 'three'
import { Root } from '../pipelines/root'


export class SystemNumbers {
    constructor () {}

    async init (root: Root) {
        console.log(root.assets.textureNumbersMask)
    }
}