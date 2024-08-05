const pool = require('./pool');

exports.getAllProducts = async() => {
  try {
    const { rows } = await pool.query(`
      SELECT products.name, products.description, products.price, productimage.url AS image_url, 
      productimage.alt AS image_alt FROM products JOIN productimage ON products.id = productimage.product_id`);
    return rows;
  } catch (error) {
    throw Error('Erro ao carregar produtos');
  }  
}

exports.getAllCategories = async() => {
  try {
    const { rows } = await pool.query('SELECT * FROM category');
    return rows;
  } catch (error) {
    throw Error('Erro ao carregar categorias');
  }
}

exports.insertProductsInStore = async(name, description, price, categoryId, url, text, quantity, location) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    const productsText = 'INSERT INTO products (name, description, price, category_id) VALUES ($1, $2, $3, $4) RETURNING id';
    const productsRows = await client.query(productsText, [name, description, price, categoryId]);
    const productId = productsRows.rows[0].id;
    console.log('Produto inserido com ID:', productId);

    const imageText = 'INSERT INTO productimage (product_id, url, alt) VALUES ($1, $2, $3)';
    await client.query(imageText, [productId, url, text]);
    console.log('Imagem inserida para o produto:', productId);

    const productCategoryText = 'INSERT INTO productcategory (product_id, category_id) VALUES ($1, $2)';
    await client.query(productCategoryText, [productId, categoryId]);
    console.log('Categoria inserida para o produto:', productId);

    const productInventoryText = 'INSERT INTO productinventory (product_id, quantity, location) VALUES ($1, $2, $3)';
    await client.query(productInventoryText, [productId, quantity, location]);
    console.log('Inventário inserido para o produto:', productId);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao guardar o produto:', error.message);
    throw Error('Não foi possível guardar o produto');
  } finally {
    client.release();
  }
}
