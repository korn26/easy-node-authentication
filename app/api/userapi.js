const db = require('../../config/postgres.js');
var bcrypt = require('bcrypt-nodejs');

var UserApi = {

    findUserByEmail: function (email, callback) {

        console.log("In findUserByEmail");
        //const sqlStr = "SELECT * FROM test_user WHERE data ->> 'email' = 'test@test.com'";
        const values = [email];
        const sqlStr = "SELECT * FROM test_user WHERE data ->> 'email' = $1";
        db.query(sqlStr, values, function (err, result) {
            callback(err, result);
            //   if (err) {
            //     console.log(err)
            //   } else {
            //     console.log(sqlStr)
            //     callback(result);
            //     //res.json(result.rows)
            //   }
        })
        //res.render('test', { title: 'Test', result: 'Success'});

    },

    // generating a hash
    generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    // checking if password is valid
    validPassword: function (password) {
        return bcrypt.compareSync(password, this.local.password);
    }

}

module.exports = UserApi;


