const db = require('../db/queries');
const bcrypt = require('bcryptjs');

exports.userLoginPageGet = async (req, res) => {
  res.render('users/login');
}

exports.userLogOutPage = async(req, res, next) => {
  req.logout((error) => {
    if(error) {return next(error)}
    res.redirect('/');
  })
}

exports.createUserGet = async (req, res) => {
 const users = await db.getUsers();
 res.render('users/index', {
  title: 'My account',
  users
 })
}

exports.createNewUserPost = async(req, res, next) => {
    const {floating_email, floating_password, 
      floating_first_name, floating_last_name, floating_phone, floating_company} = req.body;
    if(floating_email && floating_password && 
      floating_first_name && floating_last_name &&
      floating_phone && floating_company) {
      bcrypt.hash(floating_password, 10, async (error, hashedPassword) => {
      
      if(error) { return next(error)};   
          
      const user ={
      email: floating_email,
      password: hashedPassword,
      firstname: floating_first_name,
      lastname: floating_last_name,
      phone: floating_phone,
      company: floating_company
    } 
    
    try{
      await db.insertUser(user);
      res.redirect('/')
    }catch(error) {
      return next(error);
    }

  })}
}

exports.createNewUserGet = async(req, res) => {
  res.render('users/user-sign-up');
}

