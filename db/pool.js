const {Pool} = require('pg');
require('dotenv').config();

const userRole = process.env.USER_ROLE; //USER_ROLE = 'lucas',
const password = process.env.DB_PASSWORD;//DB_PASSWORD = '4026.Alface'

const pool = new Pool({
    host: 'localhost',
    database: 'product',
    user: userRole ,
    password: password,
    port: '5432'
})

async function tryConnection() {
    try {
       await pool.connect();
      console.log('connected in database')
    }catch(error) {
        console.log('Nao foi possivel se connectar ao banco de dados')
    }
}
tryConnection()

module.exports = pool;
