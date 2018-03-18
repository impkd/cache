/**
 * Created by inobaa@qq.com on 2018/3/18.
 *
 * Usage: see /routes/cacheTest.js
 */

var cache = {};

cache.create = function(timeout, maxSize, autoClear) {
    var inst = {};
    inst.timeout = timeout;
    inst.maxSize = maxSize;
    if(!inst.maxSize) inst.maxSize = 16;
    inst.autoClear = autoClear;
    inst.pool = {};
    inst.allKey = [];

    inst.del = function (key) {
        var pos = inst.allKey.indexOf(key);
        inst.allKey.splice(pos, 1);
        delete inst.pool[key];

        if(inst.allKey.length <= 0){
            clearInterval(inst.timerClearTimeoutObj);
            delete inst.timerClearTimeoutObj;
        }
    };
    inst.set = function (key, val) {
        if(!inst.pool.hasOwnProperty(key)){
            var pos = inst.allKey.indexOf(key);
            inst.allKey.splice(pos, 1);
            inst.allKey.push(key);
        }
        var now = new Date().getTime();
        inst.pool[key] = [now + inst.timeout, val];

        if(inst.allKey.length > inst.maxSize){
            inst.del(inst.allKey[0]);
        }
        if(inst.autoClear && !inst.timerClearTimeoutObj){
            inst.timerClearTimeoutObj = setInterval(_removeTimeoutObj, 100);
        }
    };
    inst.get = function (key) {
        var obj = inst.pool[key];
        if(!obj) return undefined;
        var now = new Date().getTime();
        if(inst.timeout > 0 && obj[0] < now){

            return undefined;
        }
        return obj[1];
    };

    function _removeTimeoutObj() {
        var i = 0;
        var now = new Date().getTime();
        while(i < inst.allKey.length){
            var key = inst.allKey[i];
            var obj = inst.pool[key];
            if(obj[0] < now){
                inst.del(key);
                continue;
            }
            ++i;
        }
    };
    return inst;
};

module.exports = cache;