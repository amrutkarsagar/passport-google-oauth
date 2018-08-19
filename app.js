const express = require('express');
const moongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();

// views
app.set('view engine', 'ejs');

// cookie-session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// intialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to db
moongoose.connect(keys.mongodb.dbURL, { useNewUrlParser: true }, () => {
    console.log('connected to mongodb');
});

app.get('/', (req, res)=> {
    res.render('home', {user: req.user});
});

// routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Start server 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});