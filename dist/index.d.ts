export declare function timeout({action, time, error}: {
    action: () => (any | Promise<any>);
    time: number;
    error: Error;
}): Promise<any>;
