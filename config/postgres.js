var md5 = require("blueimp-md5")
const pg = require('pg')

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'korn26',
  port: 5432,
  idleTimeoutMillis: 3000
}

const pool = new pg.Pool(dbConfig)

pool.connect((err) => {
  if (err) {
    console.log('Pool connection error', err.stack)
  } else {
    console.log('Pool connection okay')
  }
})

const exp = {
  pool,

  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },

  getUserById: (id, callback) => {
    const values = [id];
    const sql = "select * from test_user where id = $1";
    exp.query(sql, values, callback)
  },

  getUserByEmail: (email, callback) => {
    const sql = "SELECT * FROM test_user WHERE data ->> 'email' = $1";
    console.log(sql);
    console.log(`email : ${email}`)
    const values = [email];
    exp.query(sql, values, callback)
  },

  getUserByUsername: (username, callback) => {
    const sql = "SELECT * FROM test_user WHERE data ->> 'username' = $1";
    console.log(sql);
    console.log(`username : ${usrename}`)
    const values = [username];
    exp.query(sql, values, callback)
  },

  getUsers: (callback) => {
    const sql = "select * from test_user";
    exp.query(sql, callback)
  },

  createUser: (user, callback) => {
    console.log("in createUser")
    const sql = "insert into test_user(data) values ($1)";
    user.password = md5(user.password)
    console.log(user.password)
    userStr = JSON.stringify(user);
    console.log(`userStr: ${userStr}`);
    const values = [userStr];
    exp.query(sql, values, callback)
  },

  createUserSimple: (email, password, callback) => {
    console.log("in createUserSimple")
    const sql = "insert into test_user(data) values ($1)";
    hashPassword = md5(password)
    console.log(hashPassword)
    let user = { email: email, password: hashPassword }
    userStr = JSON.stringify(user);
    console.log(`userStr: ${userStr}`);
    const values = [userStr];
    exp.query(sql, values, callback)
  },

  comparePasswords(originalPassword, encodedPassword) {
    return (encodedPassword == md5(originalPassword))
  }

}

module.exports = exp
