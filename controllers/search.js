"use strict";

const User = require('../models/User');


module.exports.search_another_user = async (req, res) => {
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
}