import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import coinModel from "../assets/coin1.glb";
import coinModeRed from '../assets/coinForce.glb'
import noise from "../assets/noise.png"
import numbers from "../assets/numbers.jpg"
import iconsMap from "../assets/icons_map.jpg"
import iconsMask from "../assets/icons_msk.jpg"
import popupMapMask from "../assets/popupmapmask.jpg"
import freezeMapMask from "../assets/freezemask.png"
import circleMapMask from "../assets/circleMask.png"


export type Assets = {
    [key: string]: any,
    coinModel: any,
    textureNoise: any,
    textureNumbersMask: any,
    iconsMask: any,
    iconsMap: any,
    popupMapMask: any,
    coinModelRed: any,
    freezeMapMask: any,
    circleMapMask: any
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
        const assets: Assets = {
            coinModel: null,
            coinModelRed: null,
            textureNoise: null,
            textureNumbersMask: null,
            iconsMask: null,
            iconsMap: null,
            popupMapMask: null,
            freezeMapMask: null,
            circleMapMask: null,
        }

        return new Promise(resolve => {
            const load = (key: string, src: string): Promise<void> => {
                return new Promise(res => {
                    let loader 
                    if (src.includes('.glb')) {
                        loader = new GLTFLoader()
                    }

                    if (src.includes('.jpg') || src.includes('.png') ) {
                        loader = new THREE.TextureLoader()
                    }

                    loader.load(src, e => {
                        assets[key] = e
                        res()
                    })
                })
            }

            Promise.all([
                load('coinModel', coinModel), 
                load('textureNoise', noise), 
                load('textureNumbersMask', numbers), 
                load('iconsMask', iconsMask), 
                load('iconsMap', iconsMap), 
                load('popupMapMask', popupMapMask),
                load('coinModelRed', coinModeRed),
                load('freezeMapMask', freezeMapMask),
                load('circleMapMask', circleMapMask),
            ]).then(() => {
                resolve(assets)
            }, () => {
                console.log('not resource loaded')
            })
        })
    }
}
