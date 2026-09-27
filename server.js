const express = require("express");
const { setupDatabase } = require("./db.js");
const prodRouter = require("./products.js");
const supRouter = require("./suppliers.js");
const salesRouter = require("./sales.js");
const modifyRouter = require("./modify.js");

const app = express();
const port = 3000;

setupDatabase();

app.use(express.json());
app.use ("/sales",salesRouter)
app.use("/modify",modifyRouter)

app.use("/products", prodRouter);
app.use("/supplier", supRouter);

app.listen(port, () => {
    console.log("Server started on port " + port);
});