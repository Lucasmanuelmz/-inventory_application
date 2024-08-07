const db = require('../models/userModel');
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 255 characters.";

const validatorUser = [
  body('floating_email').trim()
  .isEmail().withMessage(`floating email must be a valid email.`)
  .isLength({min: 1, max: 100}).withMessage(`floating email ${lengthErr}`),
  body('floating_password').trim()
  .isLength({min: 1, max: 100}).withMessage(`floating password ${lengthErr}`),
  body('floating_first_name').trim()
  .isAlpha().withMessage(`floating first name ${alphaErr}`)
  .isLength({min: 1, max: 255}).withMessage(`floating first name ${lengthErr}`),
  body('floating_last_name').trim()
  .isAlpha().withMessage(`floating last name ${alphaErr}`)
  .isLength({min: 1, max: 255}).withMessage(`floating last name ${lengthErr}`),
  body('floating_phone').trim()
  .isNumeric().withMessage(`must only contain numbers`)
  .isLength({min: 9, max: 12}).withMessage(`floating phone must be between 9 and 12 characters.`),
  body('floating_company').trim()
  .isAlpha().withMessage(`floating company`)
  .isLength({min: 1, max: 100}).withMessage(`floating company ${lengthErr}`)
]

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

exports.createNewUserPost = [ 
  validatorUser, async(req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).render('users/index', {
      title: 'My title',
      errors: errors.array(),
    })
  }
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
}];

exports.createNewUserGet = async(req, res) => {
  res.render('users/user-sign-up');
}

exports.updateUserGet = async(req, res) => {
  const id = parseInt(req.params.id);
  const user = await db.createUserUpdateGet(id);
 res.render('users/update', {user})
}

exports.updateUserPost = [ 
  validatorUser, 
  async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).render('users/index', {
      title: 'Error update',
      errors: errors.array(),
    })
  }
 const id = parseInt(req.params.id)
 const {floating_email, floating_first_name,
   floating_last_name, floating_phone, floating_company} = req.body;
 if(floating_email && floating_first_name && floating_last_name &&
  floating_phone && floating_company) {
  await db.updateUserInDataBase(floating_email, floating_first_name, 
    floating_last_name, floating_phone, floating_company, id)
  }
 res.redirect('/')
}];

exports.getUsersView = async (req, res) => {
  const users = await db.createUserGetAll();
  res.render('createUser', {
    users
  })
}

exports.deleteUserFromTable = async (req, res) => {
  const id = req.body.id;
  try {
   await db.userDeletePost(id);
  res.redirect('/')  
  }catch(error) {
    throw Error('User cant delete')
  }
}

