const db = require('../models/productModel');

exports.displayProductStorage = async (req, res) => {
  try {
    const products = await db.productStorage();
    console.log('Produtos: ',products);
    if (products.length > 0) {
      res.render('index', {
        title: 'Lista de produtos',
        products
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
};

exports.productCreateGet = async (req, res) => {
  try {
    const categories = await db.categoryStorage();
    console.log('categorias: ',categories)
    if (categories.length > 0) {
      res.render('product', { categories });
    } else {
      res.status(404).send('No categories found');
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Error fetching categories');
  }
};

exports.productCreatePost = async (req, res) => {
    const { name, description, price, 
      category_id, quantity,  alt, location } = req.body;
    const urlImage = req.file ? `uploads/${req.file.filename}` : null;
  
    if (name && description && 
      price && category_id && 
      urlImage && quantity  && 
      alt && location) {
      try {
        await db.insertProductsInStore(name, 
          description, price, category_id, urlImage, 
          alt, quantity, location);
        res.redirect('/');
      } catch (error) {
        console.error("Can't save product:", error.message);
        res.status(500).send("Can't save product");
      }
    } else {
      res.status(400).send('Incomplete data');
    }
  };

  exports.productAdminGet = async(req, res) => {
    const products = await db.productStorageJoinedByCategory()
    res.render('view-product', {
      title: 'All products in table',
      products
    })
  }

  exports.renderViewProductGetUpdate = async(req, res) => {
    const id = req.params.id;
    try {
     const product = await db.updateProductGet(id);
     res.render('upadate-product', {
      product
     })
    }catch(error) {
      throw Error ('Product not found')
    }
  }

  exports.deleteProductInTable = async(req, res) => {
    const id = req.body.id;
    await db.deleteProductPost(id);
    res.redirect('/')
  }
  
  exports.updateProductInTable = async(res, req) => {
    const {name, description, price, category_id, id} = req.body;
    await db.updateProductGet(name, description, price, category_id, id);
    res.redirect('/')
  }
