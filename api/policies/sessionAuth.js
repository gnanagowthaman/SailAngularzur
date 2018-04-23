/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {//this works only if you use passport
        Logger.log('debug', 'sessionAuth.function', 'You are Authenticated.', null, null);
        return next();
    } else {
      Logger.log('debug', 'sessionAuth.function', 'Your Session Expired. Redirecting to login page.', null, null);
        // res.redirect('/logout');
        // return res.json(500, { errCode: 550 , errMsg: 'session expired' });
        return res.view('login',{message: 'Your session Expired, Please Login again!'});
    }
};
