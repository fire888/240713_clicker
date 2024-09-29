import { Studio } from "../entities/Studio"
import { Ticker } from "../entities/Ticker"
import { WidgetTopCount  } from "../entities/WidgetTopCount"
import { SystemCircles } from "../systems/SystemCircles"
import { LoaderAssets, Assets } from '../entities/Loader'
import { WidgetTimer } from "entities/WidgetTimer"
import { WidgetFreeze } from "entities/WidgetFreeze"
import { WidgetGolden } from "entities/WidgetGolden"
import { WidgetBomb } from "entities/WidgetBomb"
import { WidgetAddEnergy } from "entities/WidgetAddEnergy"
import { Background } from "entities/Background"
import { WindowResizer } from "helpers/WindowResizer"
import * as TWEEN from '@tweenjs/tween.js'

export type Root = {
    assets: Assets,
    ticker: Ticker,
    studio: Studio,
    systemCircles: SystemCircles,
    loaderAssets: LoaderAssets,
    widgetTopCount: WidgetTopCount,
    widgetTimer: WidgetTimer,
    widgetFreeze: WidgetFreeze,
    widgetGolden: WidgetGolden,
    widgetBomb: WidgetBomb,
    widgetAddEnergy: WidgetAddEnergy,
    background: Background,
    //windowResizer: WindowResizer
}

export const pipelineInit = async () => {
    const root: Root = {
        assets: null,
        ticker: new Ticker(),
        studio: new Studio(),
        widgetTopCount: new WidgetTopCount(),
        systemCircles: new SystemCircles(),
        loaderAssets: new LoaderAssets(),
        widgetTimer: new WidgetTimer(),
        widgetFreeze: new WidgetFreeze(),
        widgetGolden: new WidgetGolden(),
        widgetBomb: new WidgetBomb(),
        widgetAddEnergy: new WidgetAddEnergy(),
        background: new Background(),
        //windowResizer: new WindowResizer(),
    }

    const {
        studio,
        ticker,
        systemCircles,
        loaderAssets,
        widgetTopCount,
        widgetTimer,
        widgetFreeze,
        widgetGolden,
        widgetBomb,
        widgetAddEnergy,
        background,
    } = root

    ticker.start()

    ticker.on(TWEEN.update)

    studio.init(root)
    ticker.on(studio.render.bind(studio))

    loaderAssets.init()
    const assetsResult = await loaderAssets.loadAssets()
    root.assets = assetsResult

    background.init(root)
    background.m.position.z = -3000
    studio.add(background.m) 

    systemCircles.init(root)
    // studio.add(systemCircles.group)
    ticker.on(systemCircles.update.bind(systemCircles))

    await widgetTopCount.init(root)
    studio.add(widgetTopCount.mesh)

    await widgetTimer.init(root)
    studio.add(widgetTimer.mesh)

    await widgetAddEnergy.init(root)
    studio.add(widgetAddEnergy.mesh)
    
    await widgetFreeze.init(root)
    studio.add(widgetFreeze.mesh)

    await widgetGolden.init(root)
    studio.add(widgetGolden.mesh)

    await widgetBomb.init(root)
    studio.add(widgetBomb.mesh)


    studio.onWindowResize()

    return root
}
