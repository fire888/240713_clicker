// https://drive.google.com/drive/folders/1oCZhaICbvunn4dyJHrRJmWqF5xZzUyll
import { Root } from './pipelineInit'
import { UiNumbers } from 'entities/UiNumbers'
import * as TWEEN from '@tweenjs/tween.js'
import { SystemCircles } from 'systems/SystemCircles'
import { pause } from 'helpers/helperFunctions'
import { WidgetGolden } from 'entities/WidgetGolden'

export const pipelinePlay = async (root: Root) => {
    const {
        studio,
        systemCircles,
        widgetTopCount,
        widgetTimer,
        widgetFreeze,
        widgetGolden,
        widgetAddEnergy,
        widgetBomb,
        ticker,
    } = root

    const valWinCoin: number = 10
    const strokeWinCoin: string = '+' + valWinCoin
    const valWinCoinRed: number = 50 
    const strokeWinCoinRed: string = '+' + valWinCoinRed
    const priceFreeze: number = 100
    const priceGolden: number = 200
    const priceBomb: number = 300 
    let currentCoinsValue: number = 0
    let currentTimerValue: number = 0 

    widgetTopCount.setValue(currentCoinsValue)
    widgetTimer.setValue(currentTimerValue)
    widgetFreeze.setValue(priceFreeze)
    widgetGolden.setValue(priceGolden)
    widgetBomb.setValue(priceBomb)

    studio.setObjectToPointerIntercept(widgetAddEnergy.clickArea)
    studio.setObjectToPointerIntercept(widgetFreeze.clickArea)
    studio.setObjectToPointerIntercept(widgetGolden.clickArea)
    studio.setObjectToPointerIntercept(widgetBomb.clickArea)

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

    const clickBuyTimer = async () => {
        if (currentCoinsValue < priceFreeze) {
            return;
        }
        currentCoinsValue -= priceFreeze
        widgetTopCount.setValue(currentCoinsValue)

        currentTimerValue = 0
        widgetTimer.setValue(currentTimerValue)
    }


    const clickFreezeGame = async () => {
        if (currentCoinsValue < priceFreeze) {
            return;
        }
        currentCoinsValue -= priceFreeze
        widgetTopCount.setValue(currentCoinsValue)
        
        systemCircles.stop()
        await pause(3000)
        systemCircles.start()
    }

    const clickGolden = async () => {
        if (currentCoinsValue < priceGolden) {
            return;
        }
        currentCoinsValue -= priceGolden
        widgetTopCount.setValue(currentCoinsValue)
        systemCircles.addMoreCoins()
        await pause(5000)
        console.log('YTYTYT CLICK GOLDEN')
    }


    const clickBomb = async () => {
        if (currentCoinsValue < priceBomb) {
            return;
        }
        currentCoinsValue -= priceBomb
        widgetTopCount.setValue(currentCoinsValue)
        for (let i = 0; i < systemCircles.items.length - 5; ++i) {
            clickCoin(i)
        }
        console.log('YTYTYT CLICK BOMB')
    }


    const removeCbIntercept = studio.setCbOnInterseptTap((type: string, name: any) => {
        if (type === 'coinSimple') {
            clickCoin(name).then()
        }
        if (type === 'coinRed') {
            clickCoinRed(name).then()
        }
        if (name === 'uiClickAddEnergy') {
            clickBuyTimer().then()
        }
        if (name === 'uiClickFreeze') {
            clickFreezeGame().then()
        }
        if (name === 'uiClickGolden') {
            clickGolden().then()
        }
        if (name === 'uiClickBomb') {
            clickBomb().then()
        }
    })

    for (let i = 0; i < systemCircles.collisions.length; ++i) {
        studio.setObjectToPointerIntercept(systemCircles.collisions[i].m)
    }
    systemCircles.start()







    // complete pipeline

    let resolveCompletePipeline: any
    let clearTickerUpdateTime: () => void 

    const stopGame = () => {
        currentTimerValue = 0
        removeCbIntercept()
        studio.clearObjectsToPointerIntercept()
        systemCircles.stop()
        clearTickerUpdateTime()
        resolveCompletePipeline() 
    }

    // update timer count
    let saved = Date.now()
    clearTickerUpdateTime = ticker.on(() => {
        currentTimerValue += (Date.now() - saved) * 0.001 * 0.016
        //currentTimerValue += (Date.now() - saved) * 0.009 * 0.016
        widgetTimer.setValue(currentTimerValue)
        saved = Date.now()
        if (currentTimerValue > 1) {
            stopGame()
        }
    })

    return new Promise(res => resolveCompletePipeline = res)
}
