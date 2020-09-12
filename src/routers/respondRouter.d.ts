import { RouterInputType } from "pipelines/respond/types/routerTypes";
import { RouterOutputType } from "pipelines/respond/types/routerTypes";
export declare const layoutView = "views/layout";
export declare function respondRouter(input: RouterInputType): Promise<RouterOutputType>;
export default router;
