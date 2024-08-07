const database = require('../db/pool');

exports.insertNewCategory = async(name) => {
  const client = await database.connect();
  try {
   await client.query('INSERT INTO category (name) VALUES ($1)', [name])
  }catch(error) {
    throw Error('Cont save category')
  }
}

exports.categoryUpdateGet = async(id) => {
  const client = await database.connect();
  try {
    const {rows} = await client.query('SELECT * FROM category WHERE id = $1', [id]);
    return rows[0];
  }catch(error) {
    throw Error ('Category not found')
  }
}

exports.categoryUpdatePost = async(name, id) => {
  const client = await database.connect();
  try {
    const updateText = 'UPDATE category SET name = $1 WHERE id = $2';
    await client.query(updateText,[name, id])
  }catch(error) {
    throw Error ('Update category error')
  }
}

exports.deleteCategory = async(id) => {
  const client = await database.connect();
  try {
    await client.query('DELETE FROM category WHERE id = $1', [id])
  }catch(error) {
    throw Error('Category can not deleted')
  }
}


exports.categoryStorage = async() => {
  const client = await database.connect()
  try {
    const {rows} = await client.query('SELECT * FROM category');
    return rows;
  } catch (error) {
    throw Error('Erro ao carregar categorias');
  }
}

