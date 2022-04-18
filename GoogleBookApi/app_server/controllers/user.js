var mongoose = require("mongoose");
var axios = require("axios");
require ("dotenv");

var User = require("../models/schemas/user");
var Book = require("../models/schemas/book");
const { router } = require("../../app");

let firstName, lastName;
/**
 * Controller Method to return home page
 * @param {Object} req - req object
 * @param {Object} res - response object
 * @param {cb} next - callback method 
 */
module.exports.home = function (req, res, next) {
  res.render("signup");
};

/**
 * Controller Method to return search page with user first name and lastname
 * @param {Object} req - req object
 * @param {Object} res - response object
 * @param {cb} next - callback method 
 */
module.exports.search = function (req, res, next) {
  let nameArr = req.user.displayName.split(" ");

  if (nameArr[0] && nameArr.length > 0) firstName = nameArr[0];

  if (nameArr[nameArr?.length - 1] && nameArr[nameArr?.length - 1].length > 0)
    lastName = nameArr[nameArr?.length - 1];

  res.render("search", { firstName, lastName });
};

/**
 * Controller Method to return query history
 * @param {Object} req - req object
 * @param {Object} res - response object
 * @param {cb} next - callback method 
 */

module.exports.history = function (req,res, next) {
    Book.find({})
    .then(result => {
        res.render("history", {queries: result})
    })
    .catch(err => {
        console.log(`Error`)
    })   
}

/**
 * Controller Method to return searched book using google book api
 * @param {Object} req - req object
 * @param {Object} res - response object
 * @param {cb} next - callback method 
 */

module.exports.findBook = function (req, res, next) {
    let item = {
        query : req.body.query
    } 
    
    const searchItem = new Book(item);

    const endpoint = `${process.env.GOOGLE_BOOK_SEARCH_API}?q=${item.name}&key=${process.env.API_KEY}`;

    axios.get(endpoint)
    .then((result) => {
        searchItem.save()
        .then(saveItem => {
            res.render('search' , {firstName, lastName, data : result.data})
        })
        .catch(err => console.log(`Error in Saving`))
    })
    .catch(err => console.log(`Error in calling Axios`))
}

/**
 * Controller Method to return book detail using the id
 * @param {Object} req - req object
 * @param {Object} res - response object
 * @param {cb} next - callback method 
 */

module.exports.bookDetail = function (req , res, next) {

    const endpoint = `${process.env.GOOGLE_BOOK_DETAIL_API}${req.params.id}?key=${process.env.API_KEY}`;

    axios.get(endpoint)
    .then(result => {
        res.render('detail', {bookDetail : result.data})
    })
    .catch(err => {
        console.log(`Error`)
    })
} 

/**
 * Controller Method for google callback method
 * @param {Object} req - req object
 * @param {Object} res - response object
 * @param {cb} next - callback method 
 */

module.exports.googleCallBack = function (req, res) {
  const userInfo = {
    name: req.user.displayName,
  };
  const newUser = new User(userInfo);

  newUser
    .save()
    .then(() => {
      res.redirect("/search");
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Controller Method for logout controller
 * @param {Object} req - req object
 * @param {Object} res - response object
 * @param {cb} next - callback method 
 */

module.exports.logout = function (req, res) {
  req.session = null;
  req.logout();
  res.redirect("/");
};
