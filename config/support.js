var path = require('path');

global.requireLib = function(module){
    return require(rootPath(path.join('lib', module)));
};

global.rootPath = function(pathSuffix){
    return path.join(__dirname, '..', pathSuffix);
};