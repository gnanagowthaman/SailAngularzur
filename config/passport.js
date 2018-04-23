var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt        = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id, is_active:true } , function (err, user) {
        done(err, user);
    });
});

//passport - local login
passport.use(new LocalStrategy({
    usernameField: 'email_id',
    passwordField: 'password'
  },
  function(email_id, password, done) {
      var sql = " SELECT " +
                "   u.id, u.user_name , u.profile_image_link , u.company_name, u.created_date, s.initiated_date, s.expiry_date, " + 
                "   u.email_id, u.password, u.is_active, u.user_group_id, ur.role_id" +
                "  FROM user u, user_role ur, role r, subscription s  " +
                " WHERE u.is_active=1 and u.id=ur.user_id and ur.role_id=r.id and u.id=s.user_id and u.email_id =? ";
      var params = [email_id];
      User.query(sql, params, function(err, user) {
        if (err) {
          Logger.log('error', 'passport.use', 'The following error occurred:', null, err);
          return done(err);
        }
        if (!user || user.length == 0) {
          Logger.log('debug', 'passport.use', 'Invalid Email Id!!!', null, null);
          return done(null, false, { message: 'Invalid Email Id.' });
        }
        if (!user[0].is_active) {
          Logger.log('debug', 'passport.use', 'You are not Authorized.', null, null);
          return done(null, false, { message: 'You are not Authorized.Please contact Zurik.' });
        }
        var startDate = new Date(user[0].initiated_date);
        var expiryDate = new Date(user[0].expiry_date);
        var currentDate = new Date();
        if (startDate.valueOf() < currentDate.valueOf()  && currentDate.valueOf() < expiryDate.valueOf()) {
          bcrypt.compare(password, user[0].password, function (err, res) {
            if (!res) {
              Logger.log('debug', 'passport.use', 'Password Incorrect.', null, null);
              return done(null, false, { message: 'Password Incorrect.' });
            }
            var returnUser = {
              id            : user[0].id,
              user_name     : user[0].user_name,
              email_id      : user[0].email_id,
              company_name  : user[0].company_name,
              createdAt     : user[0].created_date,
              role_id       : user[0].role_id,
              user_group_id : user[0].user_group_id,
              profile_image_link : user[0].profile_image_link
            };
            return done(null, returnUser, { message: 'Logged In Successfully.' });
          });
        } else {
          Logger.log('debug', 'passport.use', 'Your Subscription Expired.', null, null);
          return done(null, false, { message: 'Your Subscription Expired. Please contact Zurik.' });          
        }
    });
  }

));
