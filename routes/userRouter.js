const {Router} = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/pool');
const bcrypt = require('bcryptjs');

passport.use( new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
  try{
    const {rows} = await db.query('SELECT * FROM users WHERE email = $1', [email])
    const user = rows[0];

    if(!user) {
      return done(null, false, {message: 'Icorrect email'})
    }

    const match = bcrypt.compare(password, user.password);
    if(!match) {
      return done(null, false, {message: 'Incorrect password'});
    }
    return done(null, user)
    
  }catch(error) {
    done(error)
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try{
    const {rows} = await db.query('SELECT * FROM users WHERE id = $1',[id]);
    const user = rows[0];

    done(null, user);
  }catch(error) {
    done(error)
  }
});

userRouter.get('/login',userController.userLoginPageGet);
userRouter.post('/logout', userController.userLogOutPage);
userRouter.post('/login/password', passport.authenticate('local', {
  successRedirect:('/products/create'),
  failureRedirect: ('/signup')
})
);
userRouter.get('/user', userController.createUserGet);
userRouter.post('/user', userController.createNewUserPost);
userRouter.get('/signup', userController.createNewUserGet);
userRouter.get('/update/:id/user', userController.updateUserGet);
userRouter.post('/update/user', userController.updateUserPost);
userRouter.get('/display', userController.getUsersView);
userRouter.post('/delete/user', userController.deleteUserFromTable);
module.exports = userRouter;