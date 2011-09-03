global.Node = {
    env: process.env.NODE_ENV || 'development'
};

require('./config/boot');
