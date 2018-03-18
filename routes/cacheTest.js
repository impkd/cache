var express = require('express');
var router = express.Router();

var cacheLib = require('../lib/cache');
var cacheInstance = cacheLib.create(5000, 64, true);
if(!cacheInstance) console.log('create cache fail!');

router.post('/get', function(req, res, next) {
    var key = req.body.key;
    // TODO : identify the user
    var info = cacheInstance.get(key);
    if(!info){
        // get from db;
    }
    res.status(200).json(info);
});

router.post('/set', function(req, res, next) {
    var key = req.body.key;
    var info = req.body.info;
    // TODO : identify the user
    cacheInstance.set(key, info);
    // save 2 db;
    res.status(200).json({success:true});
});

module.exports = router;
