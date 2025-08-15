export interface JsonGame {
    title?: string;
    width?: number;
    height?: number;
    scenes?: {
        [scene_key: string]: {
            objects?: {
                [object_key: string]: {
                    x?: number;
                    y?: number;
                };
            };
        };
    };
}
//# sourceMappingURL=interface.d.ts.map