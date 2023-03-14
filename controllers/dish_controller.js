const express = require('express')
const router = express.Router()
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")
const db = require('./../db')

router.get('/', ensureLoggedIn,(req, res) => {
    //console.log(req.user);
    const sql = "SELECT * FROM dishes order by title asc;"

    db.query(sql, (err, dbRes) => {
        const dishes = dbRes.rows   
        res.render("home", {dishes: dishes, email: req.session.email})
    })
})

router.get('/dishes/new', ensureLoggedIn, (req, res) => {
    res.render("new_dish")
})

router.get('/dishes/:id', ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM dishes WHERE id = $1;`
    db.query(sql, [req.params.id], (err, dbRes) => {
        const dish = dbRes.rows[0];
        res.render("dish_details", {dish})
    })
})

router.post('/dishes', ensureLoggedIn, (req, res) => {
    //console.log(req.body);

    const sql = `INSERT INTO dishes (title, image_url, user_id) VALUES ($1, $2, $3);`

    db.query(sql, [req.body.title, req.body.image_url, req.session.userId],(err, dbRes) => {
        res.redirect("/")
    })
})

router.get('/dishes/:dish_id/edit', (req, res) => {
    //fetch record for this dish
    //use it in the form in the template
    const sql = `SELECT * FROM dishes WHERE id = ${req.params.dish_id}`
    db.query(sql, (err, dbRes) => {
        if(err){
            console.log(err);
        } else {
            res.render("edit_dish", {dish: dbRes.rows[0]})
        }
    })
})

router.put('/dishes/:dish_id', (req, res) => {
    const sql = `UPDATE dishes SET title = $1, image_url = $2 WHERE id = #3;`

    db.query(sql, [req.body.title, req.body.image_url, req.params.dish_id], (err, dbRes) => {
        res.redirect(`/dishes/${req.params.dish_id}`)
    })
})

router.delete("/dishes/:dish_id", (req, res) => {    
    //console.log(req.params.id);
    const sql = `DELETE FROM dishes WHERE id = $1;`

    db.query(sql, [req.params.dish_id], (err, dbRes) => {
        res.redirect('/')
    })
})

module.exports = router