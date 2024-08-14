import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import coinModel from "../assets/coin1.glb";
import noise from "../assets/noise.png"
import numbers from "../assets/numbers.jpg"
import iconsMap from "../assets/icons_map.jpg"
import iconsMask from "../assets/icons_msk.jpg"
import popupMapMask from "../assets/popupmapmask.jpg"


export type Assets = {
    [key: string]: any,
    coinModel: any,
    textureNoise: any,
    textureNumbersMask: any,
    iconsMask: any,
    iconsMap: any,
    popupMapPask: any,
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
            coinModel: { src: coinModel, result: null },
            textureNoise: { src: noise, result: null },
            textureNumbersMask: { src: numbers, result: null },
            iconsMask: { src: iconsMask, result: null },
            iconsMap: { src: iconsMap, result: null },
            popupMapPask: { src: popupMapMask, result: null },
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
            ]).then(() => {
                resolve(assets)
            }, () => {
                console.log('not resource loaded')
            })







            // this._gltfLoader.load(coinModel, m => {
            //     this._textureLoader.load(noise, t => {
            //         this._textureLoader.load(numbers,  e => {
            //             res({
            //                 coinModel: m,
            //                 textureNoise: t,
            //                 textureNumbersMask: e,
            //                 iconsMask: null,
            //                 iconsMap: null,
            //             })
            //         })
            //     })
            // })
        })
    }
}
