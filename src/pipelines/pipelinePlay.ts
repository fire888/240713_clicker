// https://drive.google.com/drive/folders/1oCZhaICbvunn4dyJHrRJmWqF5xZzUyll
import { Root } from './pipelineInit'


const completePlay = (): Promise<void> => {
    return new Promise<void>(res => { res() })
}


export const pipelinePlay = async (root: Root) => {
    const {
        studio,
        systemCircles,
        widgetTopCount,
        widgetTimer,
        ticker,
    } = root


    let currentCoinsValue: number = 0
    let currentTimerValue: number = 0 

    widgetTopCount.setValue(currentCoinsValue)
    widgetTimer.setValue(currentTimerValue)


    let saved = Date.now()

    ticker.on((deltaTime: number) => {
        console.log(deltaTime)
        currentTimerValue += (Date.now() - saved) * 0.001 * 0.016
        widgetTimer.setValue(currentTimerValue)
        saved = Date.now()
    })


    studio.setCbOnInterseptTap((type: string, name: string) => {
        if (type === 'coin') {
            ++currentCoinsValue
            widgetTopCount.setValue(currentCoinsValue)
            systemCircles.breakCoin(name)
        }
    })

    for (let i = 0; i < systemCircles.collisions.length; ++i) {
        studio.setObjectToPointerIntercept(systemCircles.collisions[i].m)
    }

    await completePlay()
}
