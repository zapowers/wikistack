const express = require('express');
const {addPage} = require('../views');

const wikiRoute = express.Router();

wikiRoute.get("/", async (req, res, next) => {
  try {
    res.send('ZACH II');
  } catch (error) {
      next(error);
  }
});

wikiRoute.post("/", async (req, res, next) => {
  try {
    // const data = await client.query(baseQuery + "WHERE posts.id = $1", [req.params.id]);
    // const post = data.rows[0];
    // res.send(postDetails(post));
  } catch (error) {
      next(error);
  }
});

wikiRoute.get("/add", async (req, res, next) => {
  try {
    res.send(addPage());
  } catch (error) {
      next(error);
  }
});

module.exports = wikiRoute;
