const completePlay = () => {
    return new Promise(res => {})
}


export const pipelinePlay = async root => {
    const {
        studio,
        ticker,
        boxTest,
        floor,
        systemCircles,

    } = root

    for (let i = 0; i < systemCircles.items.length; ++i) {
        studio.setObjectToPointerIntercept(systemCircles.items[i])
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
