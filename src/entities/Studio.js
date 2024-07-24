import * as THREE from 'three'

export class Studio {
    constructor () {}

    init () {
        this.containerDom = document.getElementById('container-game')

        const w = window.innerWidth
        const h = window.innerHeight
        this._frustumSize = 500
        const aspect = w / h

        this.camera = new THREE.OrthographicCamera(
            .5 * this._frustumSize * aspect  / - 2,
            .5 * this._frustumSize * aspect / 2,
            this._frustumSize / 2,
            this._frustumSize / - 2,
            1,
            1000
        );
        this.camera.position.set(0, 0, 50)
        this.camera.lookAt(0, 0, 0)

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x0a1429)
        this.fog = new THREE.Fog(0x0a1429, 1, 30)

        this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3)
        this.hemiLight.position.set( 0, 20, 0 )
        this.scene.add(this.hemiLight)

        this.dirLight = new THREE.DirectionalLight( 0xffffff, 3 )
        this.dirLight.position.set(-3, 10, 2)
        this.scene.add(this.dirLight)

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.containerDom.appendChild(this.renderer.domElement)

        this.raycaster = new THREE.Raycaster()
        this.raycaster.near = 1
        this.raycaster.far = 500
        this.pointer = new THREE.Vector2()
        this.interceptObjects = []

        const onPointerMove = e => {
            // calculate pointer position in normalized device coordinates
            // (-1 to +1) for both components
            this.pointer.x = e.clientX / window.innerWidth * 2 - 1
            this.pointer.y = -e.clientY / window.innerHeight * 2 + 1
        }
        window.addEventListener('pointermove', onPointerMove)

        const onPointerDown = () => {
            this.raycaster.setFromCamera(this.pointer, this.camera)
            const intersects = this.raycaster.intersectObjects(this.interceptObjects)
            console.log(this.pointer, intersects)
            for ( let i = 0; i < intersects.length; i ++ ) {
                intersects[i].object.material.color.set(0x00ff00)
            }
        }
        window.addEventListener('pointerdown', onPointerDown)


        window.addEventListener( 'resize', this.onWindowResize.bind(this))
        this.onWindowResize()
    }

    render () {

        this.renderer.render(this.scene, this.camera)
    }

    onWindowResize() {
        const w = window.innerWidth
        const h = window.innerHeight
        const aspect = w / h

        this.camera.left = -this._frustumSize * aspect / 2
        this.camera.right = this._frustumSize * aspect / 2
        this.camera.top = this._frustumSize / 2
        this.camera.bottom = -this._frustumSize / 2
        this.camera.updateProjectionMatrix()
        this.camera.updateMatrixWorld()

        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    add (m) {
        this.scene.add(m)
    }

    setObjectToPointerIntercept (m) {
        this.interceptObjects.push(m)
    }
}
