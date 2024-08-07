const database = require('../db/pool');

exports.insertProductsInStore = async(name, description, price, categoryId, url, text, quantity, location) => {
  const client = await database.connect();
  
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
exports.updateProductGet = async(id) => {
  const client = await database.connect();
  try {
    const {rows} = await client.query('SELECT * FROM products WHERE id =$1', [id]);
    return rows[0]
  }catch(error) {
    throw Error ('Not found product')
  }
}
exports.updateProductPost = async(name, description, price, categoryId, id) => {
  const client = await database.connect()
  try {
    await client.query('BEGIN');
    const productText = 'UPDATE products SET name =$1, description = $2, price = $3, category_id WHERE id = $4';
    await client.query(productText, [name, description, price, categoryId, id])
    await client.query('COMMIT');
  }catch(error) {
    throw Error('Can not update product')
  }
}

exports.deleteProductPost = async(id) => {
  const client = await database.connect();
  try {
    await client.query('DELETE FROM products WHERE id =$1', [id]);
  }catch(error) {
    throw Error ('Can not delete product')
  }
}

exports.productStorage = async() => {
  const client = await database.connect()
  try {
    const {rows} = await client.query(`SELECT products.name, products.description, products.price, productimage.url AS image_url, 
      productimage.alt AS image_alt FROM products JOIN productimage ON products.id = productimage.product_id`);
      return rows;
  } catch (error) {
    throw Error('Erro ao carregar produtos');
  }  
}

exports.productStorageJoinedByCategory = async() => {
  const client = await database.connect()
  try {
    const {rows} = await client.query(`SELECT products.name, products.description, 
      products.price, category.name AS category_name FROM products JOIN category ON products.category_id = category.id`);
      return rows;
  } catch(error) {
    throw Error('Products not found')
  }
}
