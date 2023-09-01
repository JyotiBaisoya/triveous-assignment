const express = require("express");
const { connection } = require("./config/dbConnection");
const { userRouter } = require("./routes/user");
const { categoryRouter } = require("./routes/category");
const { productRouter } = require("./routes/product");
const cartRouter = require("./routes/cart");
const rateLimit = require('express-rate-limit');
const orderRouter = require("./routes/order");
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');

require('dotenv').config();

const app = express();
app.use(express.json());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Maximum 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", async (req, res) => {
    res.status(200).json({ message: "Home Page" })
})

app.use("/user", userRouter)
app.use("/category", categoryRouter)
app.use("/product", productRouter);
app.use("/cart", cartRouter)
app.use("/order", orderRouter)
// app.get("/check",authenticatToken,(req,res)=>{
//     res.send("working fine")
// })

app.listen(process.env.port, async () => {
    console.log(`Running on port ${process.env.port}`)
    try {
        await connection
        console.log("Connected to db")

    } catch (error) {
        console.log(error)
    }

})