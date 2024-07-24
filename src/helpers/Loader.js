import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import coinModel from '../assets/coin.glb'

export class LoaderAssets {
    constructor() {
    }

    init () {
        this._gltfLoader = new GLTFLoader()
    }

    loadAssets () {
        return new Promise(res => {
            this._gltfLoader.load(coinModel, m => {
                res(m)
            })
        })
    }
}
