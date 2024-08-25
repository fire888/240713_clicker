// https://drive.google.com/drive/folders/1oCZhaICbvunn4dyJHrRJmWqF5xZzUyll
import { Root } from './root'


const completePlay = (): Promise<void> => {
    return new Promise<void>(res => { res() })
}


export const pipelinePlay = async (root: Root) => {
    const {
        studio,
        systemCircles,
    } = root

    studio.setCbOnInterseptTap((type: string, name: string) => {
        console.log('onTap', type, name)
        if (type === 'coin') {
            systemCircles.breakCoin(name)
        }
    })

    for (let i = 0; i < systemCircles.collisions.length; ++i) {
        studio.setObjectToPointerIntercept(systemCircles.collisions[i].m)
    }

    //controlsPointer.disable()
    //controlsOrbit.enable()

    // const onKeyUp = event => {
    //     if (event.code === 'KeyO') {
    //         if (controlsPointer.isEnabled) {
    //             studio.scene.fog = null
    //             controlsPointer.disable()
    //             controlsOrbit.enable()
    //
    //         } else {
    //             studio.scene.fog = studio.fog
    //             controlsOrbit.disable()
    //             controlsPointer.enable()
    //         }
    //     }
    // }
    // document.addEventListener('keyup', onKeyUp)

    await completePlay()
}
