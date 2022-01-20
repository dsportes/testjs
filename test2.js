const val = 'x23z<av></av>,3\n$\t]\b4'
const regex = /[.<>:"/\\|?* \x00-\x1F]/g
console.log(val.replace(regex, '_'))

// const regex = /[<>:"\/\\|?\* \x00-\x1F]/g
function normpath(p) {
  const t = []
  p.forEach(s => { t.push(s.replace(regex, '_')) })
  return t.join('/')
}
console.log(normpath(['toto', val]))
