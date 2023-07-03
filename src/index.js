const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//Initializations
const app = express();
require('./database');
require('./passport/local-auth');

//settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// midedlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'lossecretosdeasius',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    app.locals.signupMessage =req.flash('signupMessage');
    app.locals.signinMessage =req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});

//Routes
app.use('/', require('./routes/index'));

// STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});