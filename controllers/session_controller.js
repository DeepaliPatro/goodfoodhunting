const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const db = require('./../db')

router.get('/login', (req, res) => {
    res.render("login")
})

router.post('/sessions', (req, res) => {
    //console.log(req.session);
    //creating a new session - logging in

    const email = req.body.email
    const password = req.body.password

    //do you even exist in the user table

    const sql = `SELECT * FROM users WHERE email = '${email}'`

    db.query(sql, (err, dbRes) => {
        //did we get a record back?
        if(dbRes.rows.length === 0) {
            //no good, user doesn't exist in the user table, stay at the login page
            res.render("login")
        } 

        const user = dbRes.rows[0]

        bcrypt.compare(password, user.password_digest, (error, result) => {
            if(result) {
                //check your id
                req.session.userId = user.id
                req.session.email = user.email

                res.redirect('/')
            } else {
                res.render("login")
            }
        })
    })
})

router.delete('/sessions', (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login")
    })
})

module.exports = router