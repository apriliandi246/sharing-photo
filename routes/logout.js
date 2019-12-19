const express = require('express');
const router = express.Router();



// handle logout
router.get('/logout', (req, res) => {
      req.logOut();
      req.flash("success_msg", "You are Logged Out");
      res.redirect('/user/login');
});


module.exports = router;