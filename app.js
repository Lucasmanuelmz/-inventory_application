const express = require('express');
const productRouter = require('./routes/productRouter');
const productController = require('./controllers/productControllers')
const expressAsyncHandler = require('express-async-handler');
const categoryRouter = require('./routes/categoryRouter');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const userRouter = require('./routes/userRouter');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const SECRET_KEY = process.env.SESSION_SECRET;

app.use(session(
    {
     secret: SECRET_KEY,
     resave: false, 
     saveUninitialized: false,
    }));
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use('/products', productRouter);
app.use('/products/category', categoryRouter);
app.use('/', userRouter);
app.get('/', expressAsyncHandler(productController.displayProductStorage));

app.listen(PORT, () => {
    console.log('Servidor iniciado com sucesso')
})