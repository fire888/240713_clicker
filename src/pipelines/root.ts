import { Studio } from "../entities/Studio"
import { Ticker } from "../helpers/Ticker"
import { BoxTest } from "../entities/BoxTest"
import { WidgetTopCount  } from "../entities/WidgetTopCount"
import { pipelineInit } from "./pipelineInit"
import { pipelinePlay } from "./pipelinePlay"
import {documentClickOnce} from "../helpers/clickHelpers";
import { SystemCircles } from "../systems/SystemCircles"
import { LoaderAssets, Assets } from '../helpers/Loader'
import { SystemNumbers } from "../systems/SystemNumbers"


export type Root = {
    assets: Assets,
    ticker: Ticker,
    studio: Studio,
    boxTest: BoxTest,
    systemCircles: SystemCircles,
    loaderAssets: LoaderAssets,
    widgetTopCount: WidgetTopCount,
    systemNumbers: SystemNumbers,
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
        systemNumbers: new SystemNumbers(),
    }

    await pipelineInit(root)
    await pipelinePlay(root)
})
