console.log('running')
require('dotenv').config()
//async errors

const express = require('express')
const app = express()

app.use(express.json())

//routes

app.get('/', (req,res) => {
    res.send('store api <a href="/api/v1/products">products route</a>')
})

//products route



const port = process.env.PORT || 3000

const start = async () => {
    try {
        //connet db
        app.listen(port, console.log(`server is running on port: ${port}`))
    } catch (error) {
        console.log(error)
        
    }
}
start()