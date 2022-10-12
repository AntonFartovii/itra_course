import  express  from 'express'
import path from 'path'
import 'dotenv/config'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
import { dirname } from 'path';
const __dirname = dirname(__filename)

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static(path.join(__dirname + "../build")))

app.get('/api', (req, res) => {
    res.status(200).json({message: 'working'})
})


const start = async () => {
    try {

        app.listen(PORT, () => {
            console.log(`Server run on ${PORT} port`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
