const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const router = require("./routes/userRoute");
require("./db/mongoose");
const publicPath = path.join(__dirname, "../client/build");

app.use(express.static(publicPath)); // please serve the static file from the publicPath
app.use(cors());

app.use(express.json());
app.use(router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("listening on port " + port);
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});
