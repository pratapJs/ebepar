const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
const connectDB = require("./config/db");
const { favicoError } = require("./middlewares/errorMiddleware");
require("dotenv").config();

//import routes not required as we are mapping through all routes using readdirSync
//const authRoutes = require("./routes/authRoutes");
//app.use("/api",authRoutes)

//db
connectDB();

//app
const app = express();

//middlewares
app.use(favicoError);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(cors());

//route middlewares allinone
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is running in port ${port}`));
