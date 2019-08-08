const EXPRESS_PORT = 1337;
const express = require("express");
const morgan = require("morgan");
const layout = require('./views/layout');
const models = require('./models');
const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/user'));

models.db.authenticate().
then(() => {
  console.log('connected to the database');
});

app.get("/", (req, res) => {
  console.log('get on /');
  res.redirect('/wiki');
});

const main = async () => {
  await models.db.sync({force: true});
  app.listen(EXPRESS_PORT, () => {
    console.log(`App listening in port ${EXPRESS_PORT}`);
  });
};

main();
