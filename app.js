const express = require("express");
const cors = require("cors");
const app = express()

const port = process.env.PORT || 5001

app.use(express.json())
app.use(cors())

app.use("/",require("./src/routes/static.route"))
app.use("/categories",require("./src/routes/category.route"))
app.use("/products",require("./src/routes/products.route"))


app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
