const express = require('express');
const { Page, User } = require("../models");
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
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      }
    })
    // const page = await Page.create(req.body)
    const page = new Page({
      title: req.body.title,
      content: req.body.content,
      slug: req.body.title,
   });
    const addedPage = await page.save();
    addedPage.setAuthor(user);
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
    const author = await User.findOne({
      where: {id : foundPage.authorId}  
  })
    res.send(wikipage(foundPage, author));
  }
  catch (error) {
    next(error);
  }
});

module.exports = wikiRoute;
