const cls = require('continuation-local-storage');
const config = require('../config');


module.exports = (req, res, next) => {
    const ns = cls.getNamespace(config.common.cls.namespace);
    if(!req.user) {
        return next();
    }
    const { id } = req.user;
    ns.bindEmitter(req);
    ns.bindEmitter(res);
    ns.run(() => {
        ns.set(config.common.cls.key, id);
        next();
    });
};