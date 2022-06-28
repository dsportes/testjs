const crypto = require('crypto')

function hashBin (str, big = false, b64 = false, seed = 0) {
  // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed
  for (let i = 0, ch; i < str.length; i++) {
    ch = str[i]
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  // const r = big ? 4294967296n * BigInt(h2) + BigInt(h1) : 4294967296 * (2097151 & h2) + (h1 >>> 0)
  const h1b = (h1 >> 2) << 2
  const r = big ? 4294967296n * BigInt(h2) + BigInt(h1) : 4294967296 * (2097151 & h2) + ((h1 >> 2) << 2)
  return b64 ? int2base64(r) : r
}

for (let i = 0; i < 10; i++) {
  const rb = crypto.randomBytes(32)
  const hb = hashBin(rb)
  console.log(hb, hb % 4)
}
