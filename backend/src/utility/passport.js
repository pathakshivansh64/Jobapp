// passport-setup.js
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from './models/User.js';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in our db
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
        return done(null, existingUser);
    }

    // If not, create a new user in our db
    const newUser = await new User({
        googleId: profile.id,
        username: profile.displayName,
        thumbnail: profile._json.picture
    }).save();
    done(null, newUser);
}));
