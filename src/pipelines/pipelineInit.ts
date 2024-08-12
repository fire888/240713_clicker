import { Root } from './root'

export const pipelineInit = async (root: Root) => {
    const {
        studio,
        ticker,
        boxTest,
        systemCircles,
        loaderAssets,
        widgetTopCount,
        widgetTimer,
    } = root

    ticker.start()

    studio.init()
    ticker.on(studio.render.bind(studio))

    boxTest.init()
    studio.add(boxTest.mesh)

    loaderAssets.init()
    const assetsResult = await loaderAssets.loadAssets()
    root.assets = assetsResult

    systemCircles.init(root)
    studio.add(systemCircles.group)
    ticker.on(systemCircles.update.bind(systemCircles))

    await widgetTopCount.init(root)
    studio.add(widgetTopCount.mesh)
    widgetTopCount.mesh.position.y = 210

    await widgetTimer.init(root)
    studio.add(widgetTimer.mesh)
    widgetTimer.mesh.position.y = -210
    widgetTimer.mesh.position.x = -100
}
