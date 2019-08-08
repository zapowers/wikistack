const express = require('express');
const { Page } = require("../models");
const addPage = require('../views/addPage');
const wikipage = require('../views/wikipage');
const main = require('../views/main');

const wikiRoute = express.Router();


wikiRoute.get("/", async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    res.send(main(allPages));
  } catch (error) {
      next(error);
  }
});

wikiRoute.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: req.body.title,
  });
  try {
    let addedPage = await page.save();
    res.redirect(`${addedPage.slug}`);
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

wikiRoute.get('/:slug', async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: {slug: req.params.slug}
    });
    res.send(wikipage(foundPage,''));
  }
  catch (error) {
    next(error);
  }
});

module.exports = wikiRoute;
