const mongoose = require('mongoose');

module.exports = function () {
      mongoose.connect('mongodb://localhost/project_1', {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
            })
            .then(() => console.log("Connect to MongoDB..."))
            .catch(err => console.log("Something wrong", err));
}