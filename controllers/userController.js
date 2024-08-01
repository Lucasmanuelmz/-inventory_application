const db = require('../db/queries');

async function createUserGet(req, res) {
 const users = await db.getUsers();
 console.log(users.map(user => user.name))
}

async function createUserPost(req, res) {
    const {firstname, lastname, email, phonenumber, password} = req.body;
    try{
      await db.insertUser(firstname, lastname, email, phonenumber, password)
    }catch(error) {
      throw Error ('Nao consegui')
    }
}

module.exports = {
    createUserGet,
    createUserPost
}