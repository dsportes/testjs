const crypt = require('./crypto')

const options = { fileMustExist: true, verbose: console.log }
const db = require('better-sqlite3')('./test.db3', options)

function fillZero(u8, n) {
  if (u8.length >= n) return u8
  const z = Buffer.alloc(n - u8.length)
  return Buffer.concat([u8, z])
}

function ts (id) {
  return id.length === 9 ? 1 : (id.length === 8 ? 2 :3)
}

function gr (id) {
  return id.length !== 9 ? 0 : crypt.u8ToInt(id.slice(0, 5))
}

function av1 (id) {
  return id.length !== 8 && id.length !== 13 ? 0 : crypt.u8ToInt(id.slice(0, 5))
}

function av2 (id) {
  return id.length !== 13 ? 0 : crypt.u8ToInt(id.slice(5, 10))
}


const xav1 = fillZero(crypt.intToU8(1234), 5)
const xav2 = fillZero(crypt.intToU8(5678), 5)
const xgr = fillZero(crypt.intToU8(999000999), 5)
const xns4 = fillZero(crypt.intToU8(444), 4)
const xns3 = fillZero(crypt.intToU8(333), 3)

const idgr = Buffer.concat([xgr, xns4])
const ida1 = Buffer.concat([xav1, xns3])
const ida1a2 = Buffer.concat([xav1, xav2, xns3])

console.log('idgr ' + ts(idgr) + ' ' + gr(idgr))
console.log('ida1 ' + ts(ida1) + ' ' + av1(ida1))
console.log('ida1a2 ' + ts(ida1a2) + ' ' + av1(ida1a2) + ' ' + av2(ida1a2))

let x
x = db.prepare('SELECT ts(?)').pluck().get(idgr)
console.log(x)
x = db.prepare('SELECT gr(?)').pluck().get(idgr)
console.log(x)
x = db.prepare('SELECT av1(?)').pluck().get(ida1)
console.log(x)
x = db.prepare('SELECT av2(?)').pluck().get(ida1a2)
console.log(x)
