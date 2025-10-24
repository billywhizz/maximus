const module_name = `./compat.${globalThis.hasOwnProperty('Bun') ? 'bun' : (globalThis.hasOwnProperty('lo') ? 'lo' : '')}.js`

const compat = await import(module_name);

export { compat }

