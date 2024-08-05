const express = require('express');
const productRouter = require('./routes/productRouter');
const productController = require('./controllers/productControllers')
const expressAsyncHandler = require('express-async-handler');
const categoryRouter = require('./routes/categoryRouter');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const userRouter = require('./routes/userRouter');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

app.use(session(
    {
     secret: process.env.SESSION_SECRET || 'cat',
     resave: false, 
     saveUninitialized: false,
    }));
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')))
app.use('/products', productRouter);
app.use('/products/category', categoryRouter);
app.use('/', userRouter);
app.get('/', expressAsyncHandler(productController.displayAllProducts));

app.listen(PORT, () => {
    console.log('Servidor iniciado com sucesso')
})