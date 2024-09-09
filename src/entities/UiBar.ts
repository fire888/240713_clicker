import * as THREE from 'three'
import { Root } from "pipelines/pipelineInit";


const vsh = `
precision mediump float;
precision mediump int;

uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional

attribute vec3 position;
attribute vec3 uv;

varying vec2 vUV;

void main()	{
    vUV = vec2(uv.x, uv.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const fsh = `
precision mediump float;
precision mediump int;

uniform float time;
uniform float val;
varying vec2 vUV;


void main()	{
    vec2 uv = vUV; 

    vec3 color1 = vec3(1., 0., 0.);
    vec3 color2 = vec3(0., 0., 1.);

    float ph = step(val, uv.x);

    gl_FragColor = vec4(color1 * (1.0 - ph) + color2 * ph, 1.);
}`



export class UiBar {
    mesh: THREE.Object3D
    material: THREE.RawShaderMaterial
    constructor () {

    }

    async init (root: Root) {
        this.mesh = new THREE.Object3D()

        const w = 100
        const h = 10

        const v = [
            0, 0, 0,
            w, 0, 0,
            w, h, 0,
            0, 0, 0,
            w, h, 0,
            0, h, 0,
        ]

        const uv = [
            0, 0, 0,
            1, 0, 0,
            1, 1, 0,
            0, 0, 0,
            1, 1, 0,
            0, 1, 0,
        ]

        const geometry = new THREE.BufferGeometry()
        const vF32 = new Float32Array(v)
        geometry.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
        const uvF32 = new Float32Array(uv)
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvF32, 3))
        geometry.computeVertexNormals()


        this.material = new THREE.RawShaderMaterial( {
            uniforms: {
                val: { value: 0.2 }
            },
            vertexShader: vsh,
            fragmentShader: fsh,
            side: THREE.DoubleSide,
            transparent: true
        } );


        const m = new THREE.Mesh(geometry, this.material)

        this.mesh.add(m)
    }

    setValue (val: number) {
        this.material.uniforms.val.value = val
    }
}