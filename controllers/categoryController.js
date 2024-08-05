const db = require('../db/queries');

exports.categoryCreateGet = async(req, res) => {
    const categories = await db.getAllCategories()
 res.render('category',{
    title: 'My categories',
    categories
 });
}

exports.categoryCreatePost = async(req, res) => {
 const {name} = req.body;
 try{
 await db.insertNewCategory(name);
 res.redirect('/products/category/categories')
 }catch {
    throw Error('Erro ao cadastrar categoria')
 }
 
};

exports.categoryCreateGetCategories = async(req, res) => {
  res.render('new')
}

exports.deleteCategoryProduct = async(req, res) => {
    const id = parseInt(req.body.id);
    try{
      await db.deleteCategory(id);
      res.redirect('/products/category/categories')
    }catch(error) {
      throw Error('Nao conseguimos deletar esta categoria')
    }
}