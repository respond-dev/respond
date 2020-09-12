export declare const rootDir: string;
export declare const unlinkExtConfig: {
    ".scss": {
        dirs: string[];
        exts: string[];
    };
    ".ts": {
        dirs: string[];
        exts: string[];
    };
};
export declare function watchUnlinkTask(): Promise<void>;
export default watchUnlinkTask;
