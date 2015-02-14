module.exports = function(_s){
    var rf = {};
    rf.express = require('express');
    rf.bodyParser = require('body-parser');
    rf.lodash = require('lodash');
    rf.fs = require('fs');
    rf.app = rf.express();
    rf.http = require('http').Server(rf.app);
    rf.path = require('path');
    rf.Primus = require('primus');
    rf.primusRooms = require('primus-rooms');
    rf.Promise = require('bluebird');
    rf.mongoose = rf.Promise.promisifyAll(require('mongoose'));
    rf.jwt = require('jsonwebtoken');
    rf.concat = require('concat-stream');

    return rf;
};