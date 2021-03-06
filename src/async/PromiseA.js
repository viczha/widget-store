/**
 * Created by taozhang on 2014/10/13.
 */

var EventEmitter = function () {
    var emitter, topics = {}, uuid = 0;

    function _add(topic, fnc) {
        topic = topics[topic];
        fnc._uuid = uuid++;
        topic.push(fnc);
        if (topic.fired) {
            var args = topic.args;
            fnc.call(args[0], args[1]);
        }
    }

    emitter = {
        on: function (topic, fnc) {
            if (typeof topic !== 'string' || typeof fnc !== 'function') {
                throw 'invalid arguments!';
            }
            if (!topics[topic]) {
                topics[topic] = [];
            }
            _add(topic, fnc);
            return this;
        },
        once: function (topic, fnc) {
            if (typeof topic !== 'string' || typeof fnc !== 'function') {
                throw 'invalid arguments!';
            }
            if (!topics[topic]) {
                topics[topic] = [];
                topics[topic].once = true;
            }
            _add(topic, fnc);
            return this;
        },
        emit: function (topic, data, context) {
            //var args = [].slice.call(arguments, 2);
            topic = topics[topic];
            if (topic && (!topic.once || topic.fired !== true)) {
                topic.fired = true;
                topic.args = [context, data];

                for (var i = 0; i < topic.length; i++) {
                    topic[i].call(context, data);
                }
            }
            return this;
        },
        remove: function (topic, fnc) {
            topic = topics[topic];
            //var i = 0, length = topic.length;
            for (var i = 0; i < topic.length; i++) {
                if (fnc._uuid === topic[i]._uuid) {
                    topic.splice(i, 1);
                    i--;
                }
            }
            return this;
        }
    };

    return emitter;
};

var Promise = function () {
    this.emitter = new EventEmitter();
    this.emit = this.emitter.emit;
};

Promise.prototype = {
    done: function (fnc) {
        this.emitter.once('done', fnc);
        return this;
    },
    fail: function (fnc) {
        this.emitter.once('fail', fnc);
        return this;
    },
    progress: function (fnc) {
        this.emitter.on('progress', fnc);
        return this;
    },
    then: function (done, fail, progress) {
        if (typeof done === 'function') {
            this.done(done);
        }
        if (typeof fail === 'function') {
            this.fail(fail);
        }
        if (typeof progress === 'function') {
            this.progress(progress);
        }
        return this;
    }
};

var state = ['progress', 'resolved', 'failed'];

var Deferred = function () {
    this._promise = new Promise();
    this.state = state[0];
};

Deferred.prototype = {
    promise: function () {
        return this._promise;
    },
    resolve: function (data) {
        if(this.state === state[0]) {
            this._promise.emit('done', data, this);
            this.state = state[1];
        }
        return this;
    },
    reject: function (data) {
        if(this.state === state[0]) {
            this._promise.emit('fail', data, this);
            this.state = state[2];
        }
        return this;
    },
    notify: function (data) {
        if(this.state === state[0]) {
            this._promise.emit('progress', data, this);
        }
        return this;
    },
    makeNodeResolver: function () {
        var self = this;
        return function (err, value) {
            if (err) {
                self.reject(err)
            } else if (arguments > 2) {
                self.resolve.call(self, [].slice.call(arguments, 1));
            } else {
                self.resolve(value);
            }
        }
    },
    when: function () {
        var slice = Array.prototype.slice,
            args = slice.call(arguments, 0),
            count = args.length,
            self = this,
            result = [];

        args.forEach(function (fn, i) {
            fn.then(function (data) {
                count--;
                result[i] = data;
                if (count === 0) {
                    self.resolve(result);
                }
            }, function (data) {
                self.reject(data);
            })
        });

        return this._promise;
    }
};