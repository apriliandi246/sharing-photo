"use strict";

module.exports.logout = (req, res) => {
      req.logOut();
      req.flash("success_msg", "You are Logged Out");
      res.redirect('/user/login');
}