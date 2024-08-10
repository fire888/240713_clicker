import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import coinModel from "../assets/coin1.glb";
import noise from "../assets/noise.png"
import numbers from "../assets/numbers.jpg"

export type Assets = {
    coinModel: any,
    textureNoise: any,
    textureNumbersMask: any,
}

export class LoaderAssets {
    _gltfLoader: GLTFLoader
    _textureLoader: THREE.TextureLoader

    constructor() {}

    init () {
        this._gltfLoader = new GLTFLoader()
        this._textureLoader = new THREE.TextureLoader()
    }

    loadAssets (): Promise<Assets> {
        return new Promise(res => {
            this._gltfLoader.load(coinModel, m => {
                this._textureLoader.load(noise, t => {
                    this._textureLoader.load(numbers,  e => {
                        res({
                            coinModel: m,
                            textureNoise: t,
                            textureNumbersMask: e,
                        })
                    })
                })
            })
        })
    }
}
