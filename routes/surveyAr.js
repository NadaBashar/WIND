var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('surveyAr',{ title: 'WIND' });
});

module.exports = router;
