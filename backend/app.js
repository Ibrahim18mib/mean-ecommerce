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

//accessing the frontend with build path
if (process.env.NODE_ENV == "production") {
  app.use(
    express.static(
      path.join(__dirname, "..", "frontend", "dist", "frontend", "browser")
    )
  );
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        "..",
        "frontend",
        "dist",
        "frontend",
        "browser",
        "index.html"
      )
    );
  });
}
//accessing END

app.listen(process.env.PORT, () => {
  console.log(
    `Server Listening in PORT->${process.env.PORT} in ${process.env.NODE_ENV}...`
  );
});
