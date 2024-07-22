export const pipelineInit = async root => {
    const {
        studio,
        ticker,
        boxTest,
        floor,
        systemCircles,
    } = root

    ticker.start()

    studio.init()
    ticker.on(studio.render.bind(studio))

    boxTest.init()
    studio.add(boxTest.mesh)

    systemCircles.init()
    studio.add(systemCircles.group)
    ticker.on(systemCircles.update.bind(systemCircles))
}
