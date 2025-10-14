export type wrap_memory = (addr: number, size: number) => Uint8Array;
export type unwrap_memory = (buf: ArrayBufferLike) => void;
export type calloc = (nitems: number, size: number) => number;
export type free = (addr: number) => void;
export declare const calloc: calloc;
export declare const free: free;
export declare const wrap_memory: wrap_memory;
export declare const unwrap_memory: unwrap_memory;
//# sourceMappingURL=compat.d.ts.map