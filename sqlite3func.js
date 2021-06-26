const options = { fileMustExist: true, verbose: console.log }
const db = require('better-sqlite3')('./test.db3', options)

function insertion () {
    const insert = db.prepare('INSERT INTO avatar (id, lc) VALUES (@id, @lc)')
    const avatars = [
        {
            id: 24,
            lc: JSON.stringify([4,5,6])
        },
        {
            id: 25,
            lc: JSON.stringify([7,5,8])
        },
        {
            id: 26,
            lc: JSON.stringify([9,10,11])
        }
    ]
    const insertAvatars = db.transaction((av) => {
        for (const av of avatars) insert.run(av);
    })
    insertAvatars(avatars)
}

function remAv (id, avr) {
    db.function('remav', (avr, lc) => {
        const a = JSON.parse(lc)
        const i = a.indexOf(avr)
        if (i !== -1) {
            a.splice(i, 1)
        }
        return JSON.stringify(a)
    })
    db.prepare('UPDATE avatar SET lc = remav(@avr, lc) WHERE id = @id').run({id, avr})
}

function addAv (id, ava) {
    db.function('addav', (ava, lc) => {
        const a = JSON.parse(lc)
        const i = a.indexOf(ava)
        if (i === -1) {
            a.push(ava)
        }
        return JSON.stringify(a)
    })
    db.prepare('UPDATE avatar SET lc = addav(@ava, lc) WHERE id = @id').run({id, ava})
}

//insertion()
remAv(23, 3)
addAv(26, 3)
