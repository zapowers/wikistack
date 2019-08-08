const express = require("express");
const morgan = require("morgan");
const layout = require('./views/layout');
const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log('get on /');
  res.send(layout('ZACH'));
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
