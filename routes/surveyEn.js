var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('surveyEn',{ title: 'WIND' });
});

module.exports = router;
