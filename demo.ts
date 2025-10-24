import { Arena } from './index.js'

function dothething (alloc: Arena) {
  alloc.bytes[i++] = i
}

function dotheasyncthing (alloc: Arena) {
  alloc.bytes[i++] = i
  return Promise.resolve()
}

function test_sync () {
  i = 0
  using allocator = new Arena(SIZE) 

  dothething(allocator)
  dothething(allocator)
  dothething(allocator)
  dothething(allocator)

//  console.log(allocator.bytes)
}

async function test_async () {
  i = 0
  await using allocator = new Arena(SIZE)

  await dotheasyncthing(allocator)
  await dotheasyncthing(allocator)
  await dotheasyncthing(allocator)
  await dotheasyncthing(allocator)

//  console.log(allocator.bytes)
}

async function test_async_all () {
  i = 0
  await using allocator = new Arena(SIZE)
  await Promise.all([...allocator.bytes].map(() => dotheasyncthing(allocator)))
//  console.log(allocator.bytes)
}

const SIZE = parseInt(process.argv[2] || '128', 10)

let i = 0

test_sync()
await test_async()
await test_async_all()
