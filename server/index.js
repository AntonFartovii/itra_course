import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import {authRouter} from "./routes/authRoute.js"
import {userRouter} from "./routes/userRoute.js";
import {sequelize} from "./db.js";
import {errorMiddleware} from "./middleware/error-middleware.js";
import cookieParser from 'cookie-parser'
import {roleRouter} from "./routes/roleRouter.js";


const PORT = process.env.PORT || 5001
const app = express()

// app.use(express.static(path.join(__dirname + "/client/build")))

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/role', roleRouter)
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server run on ${PORT} port`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
