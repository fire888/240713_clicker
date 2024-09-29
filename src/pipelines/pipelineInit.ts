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
import { TopEffect } from "entities/TopEffect"
import { Bomb } from "entities/Bomb"
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
    topEffect: TopEffect,
    bomb: Bomb,
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
        topEffect: new TopEffect(),
        bomb: new Bomb(),
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
        topEffect,
        bomb,
    } = root

    ticker.start()

    ticker.on(TWEEN.update)

    studio.init(root)
    ticker.on(studio.render.bind(studio))

    loaderAssets.init()
    const assetsResult = await loaderAssets.loadAssets()
    root.assets = assetsResult

    background.init(root)
    studio.add(background.m) 

    topEffect.init(root)
    studio.add(topEffect.m)

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

    bomb.init(root)
    studio.add(bomb.m)

    studio.onWindowResize()

    return root
}
