const express = require("express");
const cors = require("cors");
const app = express()
const bodyParser = require('body-parser');
const {errorHandler} = require("./src/middleware/error-handler");

const port = process.env.PORT || 5001

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(errorHandler);


app.use("/images", express.static('./src/uploads'))

const userRouter = require("./src/routes/user.router");
const categoryRouter = require("./src/routes/category.router")
const productRouter = require("./src/routes/product.router")
const orderRouter = require("./src/routes/order.router");


app.use("/", userRouter)
app.use("/categories", categoryRouter)
app.use("/products", productRouter)
app.use("/orders", orderRouter)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
