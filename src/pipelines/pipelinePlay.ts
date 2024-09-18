// https://drive.google.com/drive/folders/1oCZhaICbvunn4dyJHrRJmWqF5xZzUyll
import { Root } from './pipelineInit'
import { UiNumbers } from 'entities/UiNumbers'
import * as TWEEN from '@tweenjs/tween.js'
import { SystemCircles } from 'systems/SystemCircles'
import { pause } from 'helpers/helperFunctions'
import { WidgetGolden } from 'entities/WidgetGolden'
import { COIN_STATES, TYPE_COIN, TYPE_COIN_RED } from 'constants/constants'


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
    // const priceFreeze: number = 100
    // const priceGolden: number = 200
    // const priceBomb: number = 300 
    const priceFreeze: number = 10
    const priceGolden: number = 20
    const priceBomb: number = 30 
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
        // @ts-ignore: Unreachable code error
        if (!systemCircles.items[id]) {
            return    
        }
        // @ts-ignore: Unreachable code error
        if (systemCircles.items[id].state !== COIN_STATES.fallingProcess) {
            return;
        }

        currentCoinsValue += valWinCoin
        widgetTopCount.setValue(currentCoinsValue)
        
        // @ts-ignore: Unreachable code error
        systemCircles.items[id].state = COIN_STATES.hiddenProcess
        systemCircles.breakCoin(id)

        const winCoinNumber = new UiNumbers()
        await winCoinNumber.init(root)
        winCoinNumber.mesh.scale.set(.6, .6, .6)
        root.studio.add(winCoinNumber.mesh)
        winCoinNumber.show(strokeWinCoin)

        // @ts-ignore: Unreachable code error
        const pos = systemCircles.items[id].m.position
        winCoinNumber.mesh.position.copy(pos)

        const savedY = pos.y
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
        // @ts-ignore: Unreachable code error
        if (!systemCircles.items[id]) {
            return    
        }
        // @ts-ignore: Unreachable code error
        if (systemCircles.items[id].state !== COIN_STATES.fallingProcess) {
            return;
        }

        currentCoinsValue += valWinCoinRed
        widgetTopCount.setValue(currentCoinsValue)
        
        // @ts-ignore: Unreachable code error
        systemCircles.items[id].state = COIN_STATES.hiddenProcess
        systemCircles.breakCoin(id)

        const winCoinNumber = new UiNumbers()
        await winCoinNumber.init(root)
        winCoinNumber.mesh.scale.set(.6, .6, .6)
        root.studio.add(winCoinNumber.mesh)
        winCoinNumber.show(strokeWinCoinRed)

        // @ts-ignore: Unreachable code error
        const pos = systemCircles.items[id].m.position
        
        winCoinNumber.mesh.position.copy(pos)

        const savedY = pos.y
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
        
        systemCircles.makeSpeedSlow()
        await pause(3000)
        systemCircles.makeSpeedNormal()
    }

    const clickGolden = async () => {
        if (currentCoinsValue < priceGolden) {
            return;
        }
        currentCoinsValue -= priceGolden
        widgetTopCount.setValue(currentCoinsValue)
        systemCircles.startMoreCoins()
        await pause(5000)
        systemCircles.stopMoreCoins()
    }


    const clickBomb = async () => {
        if (currentCoinsValue < priceBomb) {
            return;
        }
        currentCoinsValue -= priceBomb
        widgetTopCount.setValue(currentCoinsValue)
        for (let key in systemCircles.items) {
            clickCoin(key)
        }
    }


    const removeCbIntercept = studio.setCbOnInterseptTap((type: string, name: any) => {
        if (type === TYPE_COIN) {
            clickCoin(name).then()
        }
        if (type === TYPE_COIN_RED) {
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

    systemCircles.start()







    // complete pipeline

    let resolveCompletePipeline: any
    let clearTickerUpdateTime: () => void 

    const stopGame = () => {
        currentTimerValue = 0
        removeCbIntercept()
        //studio.clearObjectsToPointerIntercept()
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
