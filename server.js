const app = require('./app')
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config()

const DB = process.env.DATABASE


mongoose.connect(DB, {

}).then(() => {
    console.log('DB connected')
})


const PORT = 3000 || process.env.PORT

app.listen(PORT , () => {
    console.log(`the server is liseting on the port ${PORT}`)
})