const User = require("../models/user");
const SK = require("../config/keys");
const { Strategy, ExtractJwt } = require("passport-jwt");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SK.cookieKey,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload._id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(null, false);
      }
    })
  );
};
