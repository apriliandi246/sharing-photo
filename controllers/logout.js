const logout = (req, res) => {
      req.logOut();
      req.flash("success_msg", "You are Logged Out");
      res.redirect('/user/login');
}

module.exports = {
      logout
}