"use strict";

module.exports = {
      // jika user belum login, maka arahkah ke jalaman login
      ensureAuthenticated: function (req, res, next) {
            if (req.isAuthenticated()) {
                  return next();
            }
            req.flash("error_msg", "Please login first");
            res.redirect('/user/login');
      },

      // jika user sudah login dan kembali lagi ke halaman login, maka arahkan ke halaman utama
      forwardAuth: function (req, res, next) {
            if (!req.isAuthenticated()) {
                  return next();
            }
            res.redirect('/');
      }
}