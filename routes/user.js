const express = require('express');
const { Page, User } = require("../models");
const userList = require('../views/userList');
const userPages = require('../views/userPages');
const userRoute = express.Router();

userRoute.get("/", async (req, res, next) => {
    try {
      const allUsers = await User.findAll();
      res.send(userList(allUsers));
    } catch (error) {
        next(error);
    }
  });

  userRoute.get('/:id', async (req, res, next) => {
    try {
      const foundUser = await User.findOne({
        where: {id: req.params.id}
      });
      const usersPages = await Page.findAll({
          where: {authorId : foundUser.id}  
      })
      res.send(userPages(foundUser, usersPages));
    }
    catch (error) {
      next(error);
    }
  });

module.exports = userRoute;
