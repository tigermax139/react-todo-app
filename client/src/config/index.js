import development from './env/development';
const env = process.env.NODE_ENV || 'development';
const config = {
    development,
    production: {
        ...development,
    },
};

export default config[env];
