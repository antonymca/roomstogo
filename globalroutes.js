'use strict'

module.exports = (app,logger)=>{       
    const routes = require('./src/routes');
    const uuid = require('node-uuid');
    app.use(function(req, res, next){       
        req.transactionId = uuid.v1();
        next();
     });
    app.use('/api/v1.0', routes);
}


