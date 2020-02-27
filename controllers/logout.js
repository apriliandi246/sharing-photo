"use strict";

module.exports.logout = (req, res) => {
      req.logOut();
      req.flash("success_msg", "You are logout");
      res.redirect('/user/login');
}