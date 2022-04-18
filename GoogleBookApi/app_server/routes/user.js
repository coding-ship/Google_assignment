var passport = require("passport");

var express = require("express");
var ctrlUser = require("../controllers/user");
var router = express.Router();

require("../../config/google-auth2");

/**
 * Function for checking whether the user is logged in or not
 * @param {Object} req request object
 * @param {Object} res  response object
 * @param {callback} next callback function 
 */
const isLoggedIn = (req, res, next) => {
  if (req.user) next();
  else res.sendStatus(401);
};

/**
 * Get Method for requesting Home Page
 * @param {String} "/" - url
 * @param {callback} ctrlUser.home - callback to call controller method for home
 */
router.get("/", ctrlUser.home);

// google authenticate route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//google authenticate callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  ctrlUser.googleCallBack
);

/**
 * Get Method for requesting Search
 * @param {String} "/search" - url
 * @param {middleware} isLoggedIn - MiddleWare to check if the person is logged in 
 * @param {callback} ctrlUser.search - callback to call controller method for search
 */
router.get("/search", isLoggedIn, ctrlUser.search);

/**
 * Post Method for Searching book using Google Book Api
 * @param {String} "/search" - url
 * @param {middleware} isLoggedIn - MiddleWare to check if the person is logged in 
 * @param {callback} ctrlUser.findBook - callback to call controller method for finding searching book using Google Book Api
*/
router.post("/search", isLoggedIn, ctrlUser.findBook);

/**
 * Post Method for getting book detail using the book id
 * @param {String} "/book/:id" - url
 * @param {middleware} isLoggedIn - MiddleWare to check if the person is logged in 
 * @param {callback} ctrlUser.bookDetail - callback to call controller method for finding book detail using id
*/

router.post("/book/:id",isLoggedIn, ctrlUser.bookDetail);

/**
 * Post Method for getting query history
 * @param {String} "/history" - url
 * @param {middleware} isLoggedIn - MiddleWare to check if the person is logged in 
 * @param {callback} ctrlUser.history - callback to call controller method for getting query history
*/

router.get("/history", isLoggedIn, ctrlUser.history);

// logout route
router.get("/logout", ctrlUser.logout);



module.exports = router;
