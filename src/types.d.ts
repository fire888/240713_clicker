import {Ticker} from "./helpers/Ticker";
import {Studio} from "./entities/Studio";
import {BoxTest} from "./entities/BoxTest";
import {SystemCircles} from "./systems/SystemCircles";
import {LoaderAssets} from "./helpers/Loader";

export type Root = {
    assets: any,
    ticker: Ticker,
    studio: Studio,
    boxTest: BoxTest,
    systemCircles: SystemCircles,
    loaderAssets: LoaderAssets,
}
