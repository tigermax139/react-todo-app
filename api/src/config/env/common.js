module.exports = {
    cls: {
        namespace: 'user_namespace',
        key: 'user_id',
    },
    pagination: {
        page: {
            min: 1,
            max: Number.MAX_SAFE_INTEGER,
            default: 1,
        },
        perPage: {
            min: 0,
            max: 40,
            default: 10,
        },
    },
    sort: [['created_at', 'DESC']]
};