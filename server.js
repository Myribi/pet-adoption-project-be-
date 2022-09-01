require("dotenv").config();
const express = require("express");
const usersRoute = require("./routes/usersRoute");
const petsRoute = require("./routes/petsRoute");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use("/images", express.static("images"));
app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/pets", petsRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening" + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
