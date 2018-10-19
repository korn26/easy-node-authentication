var express = require('express');
var router = express.Router();
const db = require('../../config/postgres.js');
//var myDatabase = require('./config/postgres.js');

router.get('/', function (req, res, next) {
  res.render('test');
  //res.render('test', { title: 'Test', result: 'Success'});
});

router.get('/users', function (req, res, next) {
  db.getUsers(function (err, result) {
    if (err) {
      next(err)
    } else {
      console.log(result.rows)
      res.json(result.rows)
    }
  })
});

router.get('/user/create/', function (req, res, next) {

  function createGuid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  }

  let guid = createGuid()
  let email = "test" + guid;
  let password = "test"

  db.createUserSimple(email, password, function (err, result) {
    if (err) {
      next(err)
    } else {
      console.log(result.rows)
      db.getUserByEmail(email, function (err, result) {
        if (err) {
          next(err)
        } else {
          console.log(result.rows)
          res.json(result.rows)
        }
      })
    }
  })
});

router.get('/user/email/:email', function (req, res, next) {
  var email = req.params.email;
  db.getUserByEmail(email, function (err, result) {
    if (err) {
      next(err)
    } else {
      console.log(result.rows)
      res.json(result.rows)
    }
  })
});

router.get('/user/:id', function (req, res, next) {
  var id = req.params.id;
  db.getUserById(id, function (err, result) {
    if (err) {
      next(err)
    } else {
      console.log(result.rows)
      res.json(result.rows)
    }
  })
});

module.exports = router;
