export type wrap_memory = (addr: number, size: number) => Uint8Array;
export type unwrap_memory = (buf: ArrayBufferLike) => void;
export type calloc = (nitems: number, size: number) => number;
export type free = (addr: number) => void;

let _calloc
let _free
let _wrap_memory
let _unwrap_memory

if (globalThis.hasOwnProperty('Bun')) {
//@ts-ignore
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

_calloc = symbols.calloc
_free = symbols.free
_wrap_memory = (addr: number, size: number) => new Uint8Array(toArrayBuffer(addr, 0, size));
_unwrap_memory = (buf: ArrayBufferLike) => {}

} else if (globalThis.hasOwnProperty('lo')) {

//@ts-ignore
const { core } = lo

_calloc = core.calloc
_free = core.free
//@ts-ignore
_wrap_memory = lo.wrap_memory
//@ts-ignore
_unwrap_memory = lo.unwrap_memory

}

export const calloc: calloc = _calloc;
export const free: free = _free;
export const wrap_memory: wrap_memory = _wrap_memory;
export const unwrap_memory: unwrap_memory = _unwrap_memory;
