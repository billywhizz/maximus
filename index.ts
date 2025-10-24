const { compat } = await import('./compat.js')

const { calloc, free, wrap_memory, unwrap_memory } = compat

export class Arena implements Disposable, AsyncDisposable {
  #size: number = 0;
  #addr: number = 0;
  #bytes: Uint8Array;

  constructor (size: number) {
    this.#size = 0;
    this.#addr = calloc(1, size);
    //@ts-ignore
    this.#bytes = wrap_memory(this.#addr, size);
  }

  get size () {
    return this.#size;
  }

  get bytes () {
    return this.#bytes;
  }

  [Symbol.dispose] () {
    unwrap_memory(this.#bytes.buffer);
    this.#size = 0;
    free(this.#addr);
    console.log(`sync.dispose`);
  }

  async [Symbol.asyncDispose] () {
    unwrap_memory(this.#bytes.buffer);
    free(this.#addr);
    this.#size = 0;
    console.log(`async.dispose`);
  }
}
