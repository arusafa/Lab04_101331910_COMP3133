const express = require("express");
const users = require("./routes/user-routes");
const mongoose = require("mongoose");
const app = express();
const SERVER_PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/", users);

mongoose.connect("mongodb+srv://fall2022_comp3123:SAFA.aru1993@cluster0.lclqo7i.mongodb.net/lab5?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}/`);
  console.log("Press CTRL + C to stop server");
});
