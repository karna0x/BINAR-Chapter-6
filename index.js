// imports
const express = require('express')
const app = express()
const port = 5555
const { user_game, user_game_biodata } = require("./models")
app.set("view engine", "ejs", "views");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const router = require('./router/app')
// const loginAPI = require("./controllers/index")
// const { response } = require('./controllers/index')
const res = require('express/lib/response')

app.use(router)

// app.use(loginAPI)

//static files
app.use(express.static('public'))
app.use('/css/', express.static(__dirname + 'public/css'))
app.use('/js/', express.static(__dirname + 'public/js'))
app.use('/img/', express.static(__dirname + 'public/img'))
app.use('/assets/', express.static(__dirname + 'public/assets'))

app.set('view engine', 'ejs')

app.post("/login", (req,res) => {

    const {username,password} = req.body

    user_game.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(response => {
        if(response != null){
            res.redirect('/dashboard')
        }else{
            res.send('user not found, please contact developer')
        }
    })
})

app.post('/user', (req,res) => {
    const {username,password,first_name,last_name,birthplace} = req.body
    user_game.create({
        username,
        password,
        isSuperAdmin: false
    }).then(user_game => {
        user_game_biodata.create({
            id_user: user_game.id,
            first_name,
            last_name,
            birthplace
        }).then(response => {
            res.redirect('/dashboard')
        })
    })
})

app.get('/user/:id/delete', (req, res) => {
    const {id} = req.params
    user_game.destroy({
        where:{id}
    }).then(response => {
        res.redirect('/dashboard')
    })
})

app.get('/user/:id/edit', (req, res) => {
    const {id} = req.params
    user_game.findOne({
        where: {id},
        include: user_game_biodata
    }).then(user => {
        res.render('edit', {user})
    })
})

app.post('/user/:id/update', (req,res) => {
    const {id} = req.params
    const {username,password,first_name,last_name,birthplace} = req.body

    user_game.update({
        username,
        password
    },{where:{id}})
    .then(response => {
        user_game_biodata.update({
            first_name,last_name,birthplace
        }, {where: {id_user:id}})
        .then(response => {
            res.redirect('/dashboard')
        })
    })
})



app.listen(port, () => console.info(`Listening on port 5555`))