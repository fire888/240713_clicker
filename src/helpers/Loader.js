import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import coinModel from '../assets/coin1.glb'
import noise from '../assets/noise.png'

export class LoaderAssets {
    constructor() {
    }

    init () {
        this._gltfLoader = new GLTFLoader()
        this._textureLoader = new THREE.TextureLoader()
    }

    loadAssets () {
        return new Promise(res => {
            this._gltfLoader.load(coinModel, m => {
                this._textureLoader.load(noise, t => {
                    res({
                        coinModel: m,
                        textureNoise: t
                    })
                })
            })
        })
    }
}
