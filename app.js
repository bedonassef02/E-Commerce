const express = require("express");
const cors = require("cors");
const app = express()
const bodyParser = require('body-parser');

const port = process.env.PORT || 5001

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/images", express.static('./src/uploads'))

app.use("/", require("./src/routes/user.router"))
app.use("/categories", require("./src/routes/category.router"))
app.use("/products", require("./src/routes/product.router"))

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
