const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const cookieParser = require("cookie-parser");

const db = new sqlite3.Database(
    './database.db', 
    sqlite3.OPEN_READWRITE, 
    (err) => {if (err) { return console.error(err)}
})
//db.run('CREATE TABLE users(id INTEGER PRIMARY KEY, name, code, chips, lotteryTicket)')
//db.run('ALTER TABLE users ADD isAdmin')
//db.run('CREATE TABLE sessions(id INTEGER PRIMARY KEY, userId, token)')
// db.run('DELETE FROM users')
// db.run(
//     'INSERT INTO users( name, code, chips, lotteryTicket, isAdmin) VALUES(?,?,?,?,?)',
//     ['Макин', "7777777", 7777777, "", true],
//     (err) => {if (err) { return console.error(err)}}
// )

function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err)
            else resolve(row)
        })
    })
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err)
            else resolve(this)
        })
    })
}

const manageCurrentUser = (req, res, cb) => {
    const token = req.get('token')

    db.get(`SELECT * from sessions WHERE token='${token}'`,(err, session) => {
        if (err) { return console.error(err)}
        if (session) { 
            db.get(`SELECT * from users WHERE id='${session.userId}'`,(err, user) => {
                if (err) { return console.error(err)}
                cb(user)
            })
        } else {
            res.status(403).send({message: 'Не найдена сессия'})
        }
    })
} 

const createSession = (userId, db) => {
    const token = String(Number.parseInt(Math.floor(Math.random()*99999999999)))
    db.run(`DELETE from sessions WHERE userId=?`,[userId])
    db.run(
        'INSERT INTO sessions(userId, token) VALUES(?,?)',
        [userId, token],
        (err) => {if (err) { return console.error(err)}}
    )
    return token
}

const app = express()
const port = 8081

app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log('Работаем на порте ' + port)
})

app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`,(err, users) => {
        if (err) { return console.error(err)}
        res.status(200).send(users)
    })
})

app.post('/login', (req, res) => {
    const {code} = req.body

    db.get(`SELECT * from users WHERE code='${code}'`,(err, row) => {
        if (err) { return console.error(err)}
        if (row) { 
            const token = createSession(row.id, db)
            res.status(200).send({ token })
        } else {
            res.status(403).send({message: 'Пользователя с таким кодом нет'})
        }
     })
})

app.get('/me', (req, res) => {
    manageCurrentUser(req, res, (user) => {
        if (user) { 
            res.status(200).send(user)
        } else {
            res.status(403).send({message: 'Недоступно'})
        }
    })
})

app.post('/user', async (req, res) => {
    const {name} = req.body

    db.get(`SELECT * from users WHERE name='${name}'`,(err, row) => {
        if (err) { return console.error(err)}
        if (row) { 
            console.log(`Такой пользователь уже есть `, row);
            res.status(400).send({message: 'Такой пользователь уже есть'})
        } else {
            const code = String(Math.floor(Math.random()*9999999)).padStart(7, '0');
            
            db.run(
                'INSERT INTO users( name, code, chips, lotteryTicket, isAdmin) VALUES(?,?,?,?,?)',
                [name, code, 1000, "", false],
                (err) => {
                    if (err) { return console.error(err) }
                    res.status(200)
                }
            )
        }
    })
})

app.put('/send-chips', async (req, res) => {
    try {
        const { recieverId, sum } = req.body

        manageCurrentUser(req, res, async (giver) => {
            try {
                if (!giver) {
                    return res.status(401).send({ message: 'Не авторизован' })
                }

                const reciever = await dbGet(
                    'SELECT * FROM users WHERE id = ?',
                    [recieverId]
                )

                if (!reciever) {
                    return res.status(404).send({ message: 'Пользователь не найден' })
                }

                if (!giver.isAdmin) {
                    if (giver.chips < sum) {
                        return res.status(400).send({
                            message: 'У тебя столько нет'
                        })
                    }

                    if (sum < 0) {
                        return res.status(400).send({
                            message: 'Илья, не знаю как, но знаю что это ты'
                        })
                    }

                    await dbRun(
                        'UPDATE users SET chips = ? WHERE id = ?',
                        [giver.chips - sum, giver.id]
                    )
                }

                await dbRun(
                    'UPDATE users SET chips = ? WHERE id = ?',
                    [reciever.chips + sum, recieverId]
                )

                res.status(200).send(
                    giver.isAdmin ? 'ok but admin' : 'ok'
                )
            } catch (err) {
                console.error(err)
                res.status(500).send({ message: 'Ошибка сервера' })
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Ошибка сервера' })
    }
})

app.put('/lottery', async (req, res) => {
    const {lotteryTicket} = req.body
    manageCurrentUser(req,res, async (user) => {
        if (user.lotteryTicket) {
            return res.status(400).send({ message: 'Символы нельзя поменять после сохранения' })
        }
        await dbRun(
            'UPDATE users SET lotteryTicket = ? WHERE id = ?',
            [lotteryTicket, user.id]
        )
        res.status(200).send('ok')
    })
})