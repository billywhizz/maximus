const { core } = lo

export type Pointer = number & { __pointer__: null };
type wrap_memory = (addr: Pointer | number, size: number) => Uint8Array;
type unwrap_memory = (buf: ArrayBufferLike) => void;
type calloc = (nitems: number, size: number) => number | Pointer;
type free = (addr: Pointer | number) => void;

export const calloc:calloc = core.calloc as calloc;
export const free:free = core.free as free;
export const wrap_memory = (addr: number, size: number) => lo.wrap_memory(addr, size, 0);
export const unwrap_memory = lo.unwrap_memory
