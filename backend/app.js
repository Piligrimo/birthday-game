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
const app = express()
const port = 8081

app.use(express.json())
app.use(cors())
app.use(cookieParser());

app.listen(port, () => {
    console.log('Работаем на порте ' + port)
})

app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`,(err, rows) => {
        if (err) { return console.error(err)}
        console.log(rows)
        res.status(200).send(rows)
    })
})

app.get('/login', (req, res) => {
    const {code} = req.body

    db.get(`SELECT * from users WHERE code='${code}'`,(err, row) => {
        res.status(200).send(row)
     })
})

app.get('/me', (req, res) => {
    const {code} = req.cookies

    db.get(`SELECT * from users WHERE name='${name}'`,(err, row) => {
        res.status(200).send(row)
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
                'INSERT INTO users( name, code, chips, lotteryTicket) VALUES(?,?,?,?,?,?,?)',
                [name, code, 1000, ""],
                (err) => {if (err) { return console.error(err)}}
            )
            const token = createSession(login, db)
            res.status(200).send({ token })
        }
    })
})