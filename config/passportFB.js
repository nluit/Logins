const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/UserFB");
module.exports = function(passport) {
    passport.use(new FacebookStrategy({
            clientID: '359399894741690',
            clientSecret: 'ab57d724120423add4c24b1d140bac00',
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },

        function(accessToken, refreshToken, profile, done) {
            // process.nextTick(function() {
            //     return done(null, profile);
            // });
            var me = new User({
                id: profile.id,
                email: profile.email,
                name: profile.displayName
            });

            /* save if new */
            User.findOne({ email: me.email }, function(err, u) {
                if (!u) {
                    me.save(function(err, me) {
                        if (err) return done(err);
                        done(null, me);
                    });
                } else {
                    console.log(u);
                    done(null, u);
                }
            });
        }

    ));

    // passport setting
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(_id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });
}