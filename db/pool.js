const {Pool} = require('pg');
require('dotenv').config()
const user_password = process.env.DB_PASSWORD;
const user_name = process.env.USER_ROLE;

module.exports = new Pool({
    host: 'localhost',
    database: 'product',
    password: user_password,
    user: user_name,
    port: '5432'
})