import { Studio } from "./entities/Studio"
import { Ticker } from "./helpers/Ticker"
import { BoxTest } from "./entities/BoxTest"
import { WidgetTopCount  } from "./entities/WidgetTopCount"
import { pipelineInit } from "./pipelines/pipelineInit"
import { pipelinePlay } from "./pipelines/pipelinePlay"
import {documentClickOnce} from "./helpers/clickHelpers";
import { SystemCircles } from "./systems/SystemCircles"
import { LoaderAssets, Assets } from './helpers/Loader'


export type Root = {
    assets: Assets,
    ticker: Ticker,
    studio: Studio,
    boxTest: BoxTest,
    systemCircles: SystemCircles,
    loaderAssets: LoaderAssets,
    widgetTopCount: WidgetTopCount,
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
    }

    await pipelineInit(root)
    await pipelinePlay(root)
})
