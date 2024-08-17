import { Root } from './root'

export const pipelineInit = async (root: Root) => {
    const {
        studio,
        ticker,
        // boxTest,
        systemCircles,
        loaderAssets,
        widgetTopCount,
        widgetTimer,
        widgetFreeze,
        widgetGolden,
        widgetBomb,
        widgetAddEnergy,
    } = root

    ticker.start()

    studio.init()
    ticker.on(studio.render.bind(studio))

    //boxTest.init()
    //studio.add(boxTest.mesh)

    loaderAssets.init()
    const assetsResult = await loaderAssets.loadAssets()
    root.assets = assetsResult

    systemCircles.init(root)
    studio.add(systemCircles.group)
    ticker.on(systemCircles.update.bind(systemCircles))

    await widgetTopCount.init(root)
    studio.add(widgetTopCount.mesh)
    widgetTopCount.mesh.position.y = 200

    await widgetTimer.init(root)
    studio.add(widgetTimer.mesh)
    widgetTimer.mesh.position.y = -200
    widgetTimer.mesh.position.x = -200

    await widgetAddEnergy.init(root)
    studio.add(widgetAddEnergy.mesh)
    widgetAddEnergy.mesh.position.x = -150
    widgetAddEnergy.mesh.position.y = -150

    await widgetFreeze.init(root)
    studio.add(widgetFreeze.mesh)
    widgetFreeze.mesh.position.x = -10
    widgetFreeze.mesh.position.y = -200

    await widgetGolden.init(root)
    studio.add(widgetGolden.mesh)
    widgetGolden.mesh.position.x = 50
    widgetGolden.mesh.position.y = -200

    await widgetBomb.init(root)
    studio.add(widgetBomb.mesh)
    widgetBomb.mesh.position.x = 110
    widgetBomb.mesh.position.y = -200
}
