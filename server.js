const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path')
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');

dotenv.config({
    path: './config/config.env',
});

require('./config/passport')(passport)

//Database
connectDB()

const PORT = process.env.PORT || 3000;
const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

// Handlebars Helpers
app.engine('.hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize ());
app.use(passport.session());
// app.set('views', './views');

app.use(express.static(path.join(__dirname, './public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`)
})