const express = require("express")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors())

const customerController = require('./controllers/customerController');

app.use('/api/customers', customerController);

const categoryController = require('./controllers/CategoryController');

app.use('/api/categories', categoryController);
app.get("/",(req,res)=>{
    res.json("HERE")
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})