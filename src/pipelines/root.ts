import { Studio } from "../entities/Studio"
import { Ticker } from "../helpers/Ticker"
import { BoxTest } from "../entities/BoxTest"
import { WidgetTopCount  } from "../entities/WidgetTopCount"
import { pipelineInit } from "./pipelineInit"
import { pipelinePlay } from "./pipelinePlay"
import {documentClickOnce} from "../helpers/clickHelpers";
import { SystemCircles } from "../systems/SystemCircles"
import { LoaderAssets, Assets } from '../helpers/Loader'
import { WidgetTimer } from "entities/WidgetTimer"
import { WidgetFreeze } from "entities/WidgetFreeze"
import { WidgetGolden } from "entities/WidgetGolden"
import { WidgetBomb } from "entities/WidgetBomb"
import { WidgetAddEnergy } from "entities/WidgetAddEnergy"
import { Background } from "entities/Background"


export type Root = {
    assets: Assets,
    ticker: Ticker,
    studio: Studio,
    boxTest: BoxTest,
    systemCircles: SystemCircles,
    loaderAssets: LoaderAssets,
    widgetTopCount: WidgetTopCount,
    widgetTimer: WidgetTimer,
    widgetFreeze: WidgetFreeze,
    widgetGolden: WidgetGolden,
    widgetBomb: WidgetBomb,
    widgetAddEnergy: WidgetAddEnergy,
    background: Background,
}

window.addEventListener("DOMContentLoaded", async () => {
    const root: Root = {
        assets: null,
        ticker: new Ticker(),
        studio: new Studio(),
        boxTest: new BoxTest(),
        widgetTopCount: new WidgetTopCount(),
        systemCircles: new SystemCircles(),
        loaderAssets: new LoaderAssets(),
        widgetTimer: new WidgetTimer(),
        widgetFreeze: new WidgetFreeze(),
        widgetGolden: new WidgetGolden(),
        widgetBomb: new WidgetBomb(),
        widgetAddEnergy: new WidgetAddEnergy(),
        background: new Background(),
    }

    await pipelineInit(root)
    await pipelinePlay(root)
})
