import express from "express"
import mongoose from "mongoose"
import session from "express-session"
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"
import passport from "passport"
import indexRouter from "./routes/indexRoutes.js"
import initializatePassport from "./config/passport.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = 8080

console.log(BD_CONNECTION);


app.use(express.json())
app.use(cookieParser('coderSectret'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.BD_CONNECTION,
        ttl: 25
    }),
    secret: "coderSecret2",
    resave: true,
    saveUninitialized: true
}))

mongoose.connect(process.env.BD_CONNECTION)
.then(() => console.log("DB is connected"))
.catch((e) => console.log(e)) 

initializatePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)

app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`);
    
})
