const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack',{
    logging: true
});

const Page = db.define ('page', {
   title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
   },
   slug: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
        notEmpty: true,
       },
   },
   content: {
       type: Sequelize.TEXT,
       allowNull: false,
   },
   status: {
       type: Sequelize.ENUM('open', 'closed'),
   }
});
Page.beforeCreate ((pageInstance, optionsObject) => {
    pageInstance.slug = slugMaker(pageInstance.title)
})

const User = db.define('user',{
   name: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
        notEmpty: true,
       },
   },
   email: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
        isEmail: true,
        notEmpty: true,
       },
   }
});

function slugMaker(string) {
    let output = string.replace(/\s+/g, '_').replace(/\W/g, '');
    return output
  }

module.exports = {
  db, Page, User
}
