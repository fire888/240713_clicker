// https://drive.google.com/drive/folders/1oCZhaICbvunn4dyJHrRJmWqF5xZzUyll
import { Root } from './pipelineInit'
import { UiNumbers } from 'entities/UiNumbers'
import * as TWEEN from '@tweenjs/tween.js'

export const pipelinePlay = async (root: Root) => {
    const {
        studio,
        systemCircles,
        widgetTopCount,
        widgetTimer,
        ticker,
    } = root

    const valWinCoin: number = 10
    const strokeWinCoin: string = '+' + valWinCoin
    const valWinCoinRed: number = 50 
    const strokeWinCoinRed: string = '+' + valWinCoinRed
    let currentCoinsValue: number = 0
    let currentTimerValue: number = 0 

    widgetTopCount.setValue(currentCoinsValue)
    widgetTimer.setValue(currentTimerValue)

    const clickCoin = async (id: any) => {
        if (systemCircles.items[id].isTapped) {
            return;
        }

        currentCoinsValue += valWinCoin
        widgetTopCount.setValue(currentCoinsValue)
        
        systemCircles.breakCoin(id)

        const winCoinNumber = new UiNumbers()
        await winCoinNumber.init(root)
        winCoinNumber.mesh.scale.set(.6, .6, .6)
        root.studio.add(winCoinNumber.mesh)
        winCoinNumber.show(strokeWinCoin)
        winCoinNumber.mesh.position.copy(systemCircles.items[id].m.position)

        const savedY = systemCircles.items[id].m.position.y
        const obj = { ph: 0 }
        new TWEEN.Tween(obj)
            .easing(TWEEN.Easing.Circular.Out)
            .to({ ph: 1 }, 2000)
            .onUpdate(obj => {
                winCoinNumber.mesh.position.y = savedY + 50 * obj.ph 
            })
            .onComplete(() => {
                studio.remove(winCoinNumber.mesh)
                winCoinNumber.destroy()
            })
            .start()
    } 

    const clickCoinRed = async (id: any) => {
        if (systemCircles.items[id].isTapped) {
            return;
        }

        currentCoinsValue += valWinCoinRed
        widgetTopCount.setValue(currentCoinsValue)
        
        systemCircles.breakCoin(id)

        const winCoinNumber = new UiNumbers()
        await winCoinNumber.init(root)
        winCoinNumber.mesh.scale.set(.6, .6, .6)
        root.studio.add(winCoinNumber.mesh)
        winCoinNumber.show(strokeWinCoinRed)
        winCoinNumber.mesh.position.copy(systemCircles.items[id].m.position)

        const savedY = systemCircles.items[id].m.position.y
        const obj = { ph: 0 }
        new TWEEN.Tween(obj)
            .easing(TWEEN.Easing.Circular.Out)
            .to({ ph: 1 }, 2000)
            .onUpdate(obj => {
                winCoinNumber.mesh.position.y = savedY + 50 * obj.ph 
            })
            .onComplete(() => {
                studio.remove(winCoinNumber.mesh)
                winCoinNumber.destroy()
            })
            .start()
    }


    const removeCbInterceptCoin = studio.setCbOnInterseptTap((type: string, name: any) => {
        if (type === 'coinSimple') {
            clickCoin(name).then()
        }
        if (type === 'coinRed') {
            clickCoinRed(name).then()
        }
    })

    for (let i = 0; i < systemCircles.collisions.length; ++i) {
        studio.setObjectToPointerIntercept(systemCircles.collisions[i].m)
    }

    systemCircles.start()

    let resolve: any
    let clearTickerUpdateTime: () => void 

    const stopGame = () => {
        currentTimerValue = 0
        removeCbInterceptCoin()
        studio.clearObjectsToPointerIntercept()
        systemCircles.stop()
        clearTickerUpdateTime()
        resolve() 
    }

    // update timer count
    let saved = Date.now()
    clearTickerUpdateTime = ticker.on(() => {
        //currentTimerValue += (Date.now() - saved) * 0.001 * 0.016
        currentTimerValue += (Date.now() - saved) * 0.009 * 0.016
        widgetTimer.setValue(currentTimerValue)
        saved = Date.now()
        if (currentTimerValue > 1) {
            stopGame()
        }
    })

    return new Promise(res => {
        resolve = res
    })
}
