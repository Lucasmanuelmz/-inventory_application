const database = require('../db/pool');

exports.userDeletePost = async(id) => {
  const client = await database.connect();
  try {
    await client.query('DELETE FROM users WHERE id = $1', [id])
  }catch(error) {
    throw Error('Can not delete')
  }
}

exports.createUserUpdateGet = async(id) => {
const client = await database.connect();
try {
const {rows} = await client.query('SELECT * FROM users WHERE id = $1', [id]);
return rows[0]
}catch(error) {
  throw Error('User not found')
}
}

exports.updateUserInDataBase = async( email, firstname, lastname, phone, company, id) => {
  const client = await database.connect();
  try {
    await client.query(`UPDATE users SET 
      email = $1, firstname = $2, lastname = $3, 
      phone=$4, company = $5  WHERE id = $6`, [email, firstname, lastname, phone, company, id])
  }catch(error) {
    throw Error("Can't update user")
  }
}

exports.createUserGetAll = async() => {
  const client = await database.connect();
try{
 const {rows} = await client.query('SELECT * FROM users');
 return rows;
}catch(error) {
throw Error('User not found')
}
}


