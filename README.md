# cache

##cache 是干什么的?

cache 就是缓存，帮你把很常用的 K-V 键值保存起来。

本模块是一个非常轻量的模块，可以很简单嵌到自己代码内。

模块支持这三个参数：

timeout：缓存有效时间，毫秒为单位。从加入之后开始计时。

maxSize：缓存最多存放几个K-V对。

autoClear：是否自动清理过期的缓存，如果启用，则每100毫秒会自动清一遍。


##工作原理

用Object来存储需要缓存的数据。

用一个数组来存放当前所有KEY值。


##注意事项

由于使用了数组来存放KEY的先后顺序，故而当maxSize非常大时，效率较低。

##使用示例（app.js部分）
```javascript
var express = require('express');
var app = express();

var cache = require('./routes/cacheTest.js');
app.use('/cache', cache);

```

##使用示例（routes/cacheTest.js）

```javascript

var express = require('express');
var router = express.Router();

var cacheLib = require('../lib/cache');
var cacheInstance = cacheLib.create(5000, 64, true);
if(!cacheInstance) console.log('create cache fail!');

router.post('/get', function(req, res, next) {
    var key = req.body.key;
    // TODO : identify the user
    var info = cacheInstance.find(key);
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


```

## 捐赠
如果您觉得Wechat对您有帮助，欢迎请作者一杯咖啡

![捐赠cache](https://github.com/impkd/cache/blob/master/d.png)

