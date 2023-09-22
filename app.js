console.log('running')

require('dotenv').config()
require('express-async-errors')

//async errors

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

//routes

app.get('/', (req,res) => {
    res.send('store api <a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)
//products route



const port = process.env.PORT || 3000

const start = async () => {
    try {
        //connet db
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`server is running on port: ${port}`))
    } catch (error) {
        console.log(error)
        
    }
}
start()