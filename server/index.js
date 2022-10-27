import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import {getDirname} from "./utils/getPath.js";
import {errorMiddleware} from "./middleware/error-middleware.js";
import {sequelize} from "./db.js";
import {authRouter} from "./routes/authRouter.js"
import {userRouter} from "./routes/userRouter.js";
import {roleRouter} from "./routes/roleRouter.js";
import {collectionRouter} from "./routes/collectionRouter.js";
import {tagRouter} from "./routes/tagRouter.js";
import {commentRouter} from "./routes/commentRouter.js";
import {itemRouter} from "./routes/itemRouter.js";
import {likeRouter} from "./routes/likeRouter.js";
import {propRouter} from "./routes/propRouter.js";

const PORT = Number(process.env.PORT) || 5001
const app = express()
const dirname = getDirname( import.meta.url )

app.use(cors())
app.use(express.json())
// app.use(express.static( path.resolve(dirname,'./public/')))
app.use(cookieParser())
app.get('/', function (req, res) {
    res.send('Client: <a href="https://irtaclient.vercel.com">https://irtaclient.vercel.app</a>');
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/role', roleRouter)
app.use('/api/collection', collectionRouter)
app.use('/api/item', itemRouter)
app.use('/api/tag', tagRouter)
app.use('/api/comment', commentRouter)
app.use('/api/like', likeRouter)
app.use('/api/prop', propRouter)
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
