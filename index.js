const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('express-flash')
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

app.use(
    session({
        name: "session",
        secret:"nosso_secret",
        resave: falseS,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(),'sessions')
        }),
        cookie:{
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now()+360000)
        }
    }),   
)

app.use(flash())

app.use((req,res, next) =>{
    if(req.session.userid){
       res.locals.session = req.session 
    }
    next()
})

conn.sync()
    .then(()=>{
        app.listen(3000)
    })
    .catch((erro)=> console.log(err))