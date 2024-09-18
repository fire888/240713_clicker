import * as THREE from "three";
import { Root } from "pipelines/pipelineInit";
import { CoinCollision } from './CoinCollision'
import { COIN_STATES, TYPE_COIN } from 'constants/constants'


export class Coin {
    static type: string = TYPE_COIN

    type = TYPE_COIN
    id: number = Math.floor(Math.random() * 100000) 
    m: THREE.Mesh
    collision: CoinCollision
    readonly _xRotSpeed: number = (Math.random() - .5) * 0.1
    readonly _zRotSpeed: number = (Math.random() - .5) * 0.1
    state: string = COIN_STATES.readyToFall
    _root: Root

    constructor(root: Root) {
        this._root = root
        
        const g = root.assets.coinModel.scene.children[0].geometry
        const m = new THREE.MeshPhongMaterial({ 
            //color: 0xbbbbbb, 
            //map: root.assets.textureNoise, 
            color: 0xbbbbbb,
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
        this.m.scale.set(30, 9, 30)
        this.m.rotation.x = Math.PI / 2

        this.collision = new CoinCollision()
        this.collision.m.visible = false
        this.collision.m.userData.userName = this.id
        this.collision.m.userData.userType = Coin.type
    }

    updateRotation () {
        if (this.state !== COIN_STATES.fallingProcess) {
            return
        }
        this.m.rotation.x += this._xRotSpeed
        this.m.rotation.z += this._zRotSpeed
    }

    setColor (color: number) {
        // @ts-ignore: Unreachable code error
        this.m.material.color.set(color)
    }

    addToScene () {
        this._root.studio.add(this.m)
        this._root.studio.add(this.collision.m)
        this._root.studio.setObjectToPointerIntercept(this.collision.m)
    }

    setPosition (x: number, y: number, z: number) {
        this.m.position.set(x, y, z)
        this.collision.m.position.copy(this.m.position)
    }

    setPositionX (x: number) {
        this.m.position.x = x
        this.collision.m.position.x = this.m.position.x
    }

    setPositionY (y: number) {
        this.m.position.y = y
        this.collision.m.position.y = this.m.position.y
    }

    addToPositionY (speedY: number) {
        this.m.position.y += speedY
        this.collision.m.position.y = this.m.position.y
    }

    setPositionZ (z: number) {
        this.m.position.z = z
        this.collision.m.position.z = this.m.position.z
    }
}
