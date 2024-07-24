export const pipelineInit = async root => {
    const {
        studio,
        ticker,
        boxTest,
        floor,
        systemCircles,
        loaderAssets,
        assets,
    } = root

    ticker.start()

    studio.init()
    ticker.on(studio.render.bind(studio))

    boxTest.init()
    studio.add(boxTest.mesh)

    loaderAssets.init()
    const coinModel = await loaderAssets.loadAssets()
    assets.coinModel = coinModel

    systemCircles.init(root)
    studio.add(systemCircles.group)
    ticker.on(systemCircles.update.bind(systemCircles))
}
