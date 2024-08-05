const db = require('../db/queries');
exports.displayAllProducts = async (req, res) => {
  try {
    const products = await db.getAllProducts();
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
    const categories = await db.getAllCategories();
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
    const { name, description, price, category_id, quantity,  alt, location } = req.body;
    const urlImage = req.file ? `uploads/${req.file.filename}` : null;
  
    if (name && description && price && category_id && urlImage && quantity  && alt && location) {
      try {
        await db.insertProductsInStore(name, description, price, category_id, urlImage, alt, quantity, location);
        res.redirect('/');
      } catch (error) {
        console.error("Can't save product:", error.message);
        res.status(500).send("Can't save product");
      }
    } else {
      res.status(400).send('Incomplete data');
    }
  };
  
