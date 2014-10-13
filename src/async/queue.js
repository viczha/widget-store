/**
 * Created by taozhang on 2014/10/13.
 */

var Promise = function () {
    this.queue = [];
    this.isPromise = true;
};

Promise.prototype.then = function(success, fail, progress) {
    var handler = {};
    if(typeof success === 'function') {
        handler['success'] = success;
    }

    if(typeof fail === 'function') {
        handler['fail'] = fail;
    }

    if(typeof progress === 'function') {
        handler['progress'] = progress;
    }

    this.queue.push(handler);

    return this;
};

var Deferred = function () {
    this.promise = new Promise();
};


Deferred.prototype.resolved = function(data) {
    var promise = this.promise;

    var handler;

    while(handler = promise.queue.shift()) {
        if(handler && handler.success) {
            var rect = handler.success(data);
            if(rect && rect.isPromise === true) {
                rect.queue = promise.queue();
                this.promise = rect;
            }
        }
    }
};

Deferred.prototype.reject = function (err) {
    var promise = this.promise;
    var handler;

    while(handler = promise.queue.shift()) {
        if(handler && handler.error) {
            var rect = handler.error(err);
            if(rect.isPromise) {
                rect.queue = promise.queue;
                this.promise =rect;
            }
        }
    }
};

Deferred.prototype.callback = function(){
    var self = this;

    return function (err, data) {
        if(err) {
            return self.reject(err);
        }

        self.resolve(data);
    }
};

smooth = function(fn) {
    return function() {
        var deferred = new Deferred();
        var args = [].slice.call(arguments, 0);
        args.push(deffered.callback());
        fn.call(null, args);
        return deferred.promise;
    }
};