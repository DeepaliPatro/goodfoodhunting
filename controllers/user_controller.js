const express = require('express')
const router = express.Router()

const db = require('./../db') //nee to save user to db

const bcrypt = require("bcrypt")

router.get('/users', (req, res) => {
   res.render("signup")
}) //list of users

router.post('/users', (req, res) => {

    bcrypt.genSalt(10, (err,salt) => {

        bcrypt.hash(req.body.password, salt, (err, digestedPassword) => {
            //check if existing user
            const sql1 = `SELECT * FROM users WHERE email = '${req.body.email}';`
            db.query(sql1, (err, dbRes) => {
                //did we get a record back?
                if(dbRes.rows.length > 0) {
                    //user already exists in the user table, go to the the login page
                    // console.log(dbRes.rows.length);
                    res.redirect("login")
                } 
                bcrypt.compare(req.body.confirm_password, digestedPassword, (error, result) => {
                    if(result) {
                        const sql = `
                                    INSERT INTO users (email, password_digest) VALUES ($1, $2) returning id;
                        `
                        db.query(sql, [req.body.email, digestedPassword], (err, dbRes) => {
                            if(err){
                                console.log(err);
                            } else {
                                // console.log(dbRes.rows[0].id);
                                req.session.userId = dbRes.rows[0].id
                                req.session.email = req.body.email
                
                                res.redirect('/')
                            }
                        })   
                    } else {
                        res.render("signup")
                    }
                })
            })
        })
    
    })
}) //create user
/*
router.delete('/users/:id') //delete a user
router.put('userd/:id') //get a single user
router.get('/users/new') //get new user form
router.get('/users/:id/edit') //get existing user form
router.get("/users/:id") //get single user
*/

module.exports = router