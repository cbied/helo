require('dotenv').config()
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    authController = require('./authController')
    app = express(),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;


massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        console.log(`it's ALIVE!`)
    })
    .catch(error => console.log(`oops, you have an error: ${error}`))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7  // 1 week
    }
}))

app.use(express.json())

// authController
app.post('/api/auth/register', authController.register)
app.post('/api/auth/login', authController.login)

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})