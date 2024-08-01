const pool = require('./pool');

async function getAllProducts() {
    try {
      const {rows} = await pool.query('SELECT * FROM products');
      return rows;
    }catch(error) {
        throw Error('Erro ao carregar produtos')
    }  
}

async function getUsers() {
    try {
     const {rows} = await pool.query('SELECT * FROM users');
     return rows;
    }catch(error) {
        throw Error ('Nao foi encontrado nenhum usuario '+error.message)
    }
}

async function insertUser(users, productreview) {

    try {
    const client = pool.connect();
    await client.query('BEGIN');
    const userText = 'INSERT INTO users (firstname, lastname, email, phonenumber, password) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    const usersData = await client.query(userText, [users.firstname, users.lastname, users.email, users.phonenumber, users.password]);
    const userId = usersData.rows[0].id;

    for( let review of productreview) {
        const insertReviewText = 'INSERT INTO productreview (user_id, rating, comment) VALUES ($1, $2, $3)';
        await client.query(insertReviewText,[userId, review.rating, review.comment])
    }
    await client.query('COMMIT');
}catch(error) {
    await client.query('ROLLBACK')
    throw Error('Nao foi possivel adicionar o usuario')
}finally{
    await client.release()
}
}

async function getAllcategories() {
  const {rows} = await pool.query('SELECT * FROM category');
  return rows
}

async function insertNewCategory(name) {
    const client = await pool.connect();
    try {
     await client.query('BEGIN');
      const categoryText = 'INSERT INTO category (name) VALUES ($1)';
      await client.query(categoryText, [name]);

      await client.query('COMMIT');
    }catch {
        await client.query('ROLLBACK');
        throw Error ('Categoria nao adicionada')
    }
}

async function deleteCategory(id) {
    try {
        const deleteCategoryQuery = 'DELETE FROM category WHERE id = $1, RETURNING *';
         const resultCategory = await pool.query(deleteCategoryQuery,[id]);
         return resultCategory.rows[0];

    } catch(error) {
        throw Error('Nao foi possivel apagar a categoria')
    }
}

async function insertProductsInStore(productcategory, category, productimage, 
    productinventory, productreview, product, productvariation){
    const client = await pool.connect()
    
    try{
        await client.query('BEGIN');
    
        const productsText = 'INSERT INTO products (name, price, description) VALUES ($1, $2, $3), RETURNING id';
        const productsRows = await client.query(productsText, [product.name, product.price, product.description]);
        const productId = productsRows.rows[0].id;

        const categoriesText = 'INSERT INTO category (name) VALUES ($1), RETURNING id';
        const resCategories = await client.query(categoriesText, [category.name]);
        const categoryId = resCategories.rows[0].id;

        for(let image of productimage) {
            const imageText = 'INSERT INTO (product_id, url, value) VALUES ($1, $2, $3)';
            await client.query(imageText, [productId, image.url, image.value]);
        }
       
        if(productcategory) {
         const productCategoryText = 'INSERT INTO productcategory (product_id, category_id) VALUES ($1, $2)';
         await client.query(productCategoryText, [productId, categoryId]);
        }

        for( let inventor of productinventory) {
         const productInventoryText = 'INSERT INTO productinvetory (product_id, quantity, location) VALUES ($1, $2, $3)';
         await client.query(productInventoryText, [productId, inventor.quantity, inventor.location]);
        }

        for(let review of productreview) {
          const productReviewText = 'INSERT INTO productreview (product_id, user_id, rating, comment) VALUES($1)';
           await client.query(productReviewText, [productId, review.user_id, review.rating, review.comment]);
        }

        for(let variation of productvariation) {
            const productVariationText = 'INSERT INTO productvariation (product_id, name, value) VALUES ($1, $2, $3)';
            await client.query(productVariationText, [productId, variation.name, variation.value]);
        }

        await client.query('COMMIT')
    }catch(error) {
        await client.query('ROLLBACK')
        throw Error ('Nao foi possivel guardar o produto')
    }finally{
        await client.release()
    }
}
module.exports = {
    getAllProducts,
    getUsers,
    insertUser,
    insertProductsInStore,
    getAllcategories,
    insertNewCategory,
    deleteCategory,
}