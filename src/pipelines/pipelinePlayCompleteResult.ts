// https://drive.google.com/drive/folders/1oCZhaICbvunn4dyJHrRJmWqF5xZzUyll
import { Root } from './pipelineInit'
import { documentClickOnce } from '../helpers/clickHelpers'



export const pipelinePlayCompleteResult = async (root: Root) => {
    const {
        studio,
        systemCircles,
        widgetTopCount,
        widgetTimer,
        ticker,
    } = root

    await documentClickOnce()

    const valWinCoin: number = 10
    const strokeWinCoin: string = '+' + valWinCoin
    const valWinCoinRed: number = 50 
    const strokeWinCoinRed: string = '+' + valWinCoinRed
    let currentCoinsValue: number = 0
    let currentTimerValue: number = 0 

    widgetTopCount.setValue(currentCoinsValue)
    widgetTimer.setValue(currentTimerValue)

    await documentClickOnce()
}
