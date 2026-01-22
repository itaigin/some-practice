export interface BuildPaths {
    entry: string;
    html: string;
    public: string;
    output: string;
    src: string;
    components: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
    port: number;
    mode: BuildMode;
    paths: BuildPaths;
    platform: string;
    analyzer?: boolean;
}