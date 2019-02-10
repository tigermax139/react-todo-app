const cls = require('continuation-local-storage');
const config = require('../../config');

const setUserToEntity = (instance, options) => {
    const ns = cls.getNamespace(config.common.cls.namespace);
    if (!ns) return instance; // ns is absent when seeds running
    const user_id = ns.get(config.common.cls.key);
    console.log('setUserToEntity', options);
    if (user_id) {
        instance.user_id = user_id;
    }
};

const setUserToOptions = options => {
    const ns = cls.getNamespace(config.common.cls.namespace);
    if (!ns) {
        return options;
    } // ns is absent when seeds running
    const user_id = ns.get(config.common.cls.key);
    console.log('setUserToOptions', options);
    options.where.user_id = user_id;
};

module.exports = {
    setUserToEntity,
    setUserToOptions,
};