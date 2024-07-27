const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./config/connectDatabase");

dotenv.config({ path: path.join(__dirname, "/config/config.env") });

const products = require("./routes/product");
const order = require("./routes/order");

connectDatabase();

app.use(express.json());

app.use("/api/mib/", products);
app.use("/api/mib/", order);

app.listen(process.env.PORT, () => {
  console.log(
    `Server Listening in PORT->${process.env.PORT} in ${process.env.NODE_ENV}...`
  );
});
