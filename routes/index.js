var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*
router.get('/employees', function(req, res, next) {
  res.render('employees', { title: 'Employees' });
});
*/
module.exports = router;
