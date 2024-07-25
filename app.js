const express = require('express');
const productRouter = require('./routes/productRouter');
const expressAsyncHandler = require('express-async-handler');
const { displayProducts } = require('./controllers/productControllers');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use('/products', productRouter);

app.get('/', expressAsyncHandler(displayProducts))

app.listen(PORT, () => {
    console.log('Servidor iniciado com sucesso')
})