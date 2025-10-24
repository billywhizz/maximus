const { dlopen, FFIType, toArrayBuffer } = await import('bun:ffi')

const {
  symbols
} = dlopen(
  `\0`, {
    calloc: {
      args: [FFIType.u32, FFIType.u32],
      returns: FFIType.pointer
    },
    free: {
      args: [FFIType.pointer],
      returns: FFIType.void
    }
  }
)

export type Pointer = number & { __pointer__: null };
type wrap_memory = (addr: Pointer | number, size: number) => Uint8Array;
type unwrap_memory = (buf: ArrayBufferLike) => void;
type calloc = (nitems: number, size: number) => number | Pointer;
type free = (addr: Pointer | number) => void;

//export const calloc:calloc = (nitems: number, size: number) => 0;
//export const free:free = (addr: Pointer | number) => {};
//export const wrap_memory = (addr: Pointer, size: number) => new Uint8Array(size);
//export const unwrap_memory = (buf: ArrayBufferLike) => {}

export const calloc:calloc = symbols.calloc as calloc;
export const free:free = symbols.free as free;
export const wrap_memory = (addr: Pointer, size: number) => new Uint8Array(toArrayBuffer(addr, 0, size));
export const unwrap_memory = (buf: ArrayBufferLike) => {}
