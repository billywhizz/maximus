declare class Arena implements Disposable, AsyncDisposable {
    #private;
    constructor(size: number);
    get size(): number;
    get bytes(): Uint8Array<ArrayBufferLike>;
    [Symbol.dispose](): void;
    [Symbol.asyncDispose](): Promise<void>;
}
export { Arena };
//# sourceMappingURL=index.d.ts.map