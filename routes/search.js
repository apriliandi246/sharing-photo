const express = require('express');
const User = require('../models/User');
const {
      ensureAuthenticated
} = require('../config/auth');
const router = express();


router.get('/', ensureAuthenticated, async (req, res) => {
      let query = User.find();

      if (req.query.name != null && req.query.name != '') {
            query = query.regex('name', new RegExp(req.query.name, 'i'));
      }

      try {
            const name = await query.exec();
            res.render('search/search', {
                  username: name
            });

      } catch (err) {
            console.log("Something wrong => ", err);
            return;
      }
});



module.exports = router;