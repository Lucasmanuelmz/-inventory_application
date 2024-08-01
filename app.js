const express = require('express');
const productRouter = require('./routes/productRouter');
const productController = require('./controllers/productControllers')
const expressAsyncHandler = require('express-async-handler');
const categoryRouter = require('./routes/categoryRouter');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use('/products', productRouter);
app.use('/products/category', categoryRouter);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', expressAsyncHandler(productController.displayAllProducts));

app.listen(PORT, () => {
    console.log('Servidor iniciado com sucesso')
})