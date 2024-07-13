export const pipelineInit = async root => {
    const {
        studio,
        ticker,
        boxTest,
        floor,
    } = root

    ticker.start()

    studio.init()
    ticker.on(studio.render.bind(studio))

    boxTest.init()
    studio.add(boxTest.mesh)
}
