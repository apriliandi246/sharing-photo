const passport = require('passport');


const render_login_page = (req, res) => {
      res.render('register_login/login');
}


const login = async (req, res, next) => {

      try {
            const {
                  email,
                  password
            } = req.body;

            let errors = [];

            if (!email || !password) {
                  errors.push({
                        msg: "Please fill all fields"
                  });
            }

            if (errors.length > 0) {
                  return res.render('register_login/login', {
                        errors,
                        email,
                        password
                  });

            } else {
                  passport.authenticate('local', {
                        successRedirect: '/',
                        failureRedirect: '/user/login',
                        failureFlash: true
                  })(req, res, next);
            }


      } catch (err) {
            console.log("Something wrong", err);
            return;
      }

}


module.exports = {
      render_login_page,
      login
}