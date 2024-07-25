const pool = require('./pool');

async function getAllProducts() {
    try {
      const querySelect = 'SELECT * FROM products'
      const {rows} = await pool.query(querySelect);
      return rows;
    }catch(error) {
        throw Error('Erro ao carregar produtos')
    }
    
}

async function insertProducts() {
    try{
        const queryString = 'INSERT INTO products (name, description, category_id, created_at, updated_at) VALUES ($1, $2, $3)';
     await pool.query(queryString, [name, description, category_id, created_at, updated_at])
    }catch(error) {
        throw Error ('Nao foi possivel guardar o produto')
    }
}

module.exports = {
    getAllProducts,
    insertProducts
}