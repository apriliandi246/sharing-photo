const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.get('/search', async (req, res) => {

      let user = await User.find({
            name: 'apriliandis'
      }).select({
            name: 1
      });


      res.render('search', {
            name: user
      });

});


module.exports = router;