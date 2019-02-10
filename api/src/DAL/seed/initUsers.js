const faker = require('faker');
const UserDAO = require('../UserDAO');

(async () => {
    const promises = [];
    const emails = ['user@example.com', 'test@example.com'];
    for (let i = 0; i < 2; i++) {
        const confirm_date = new Date();
        console.log(confirm_date);
        const user = {
            first_name: faker.name.firstName(i),
            last_name: faker.name.lastName(i),
            email: emails[i] || faker.internet.email(),
            image_url: faker.image.avatar(),
            confirm_date,
            password: '1234567890',
        };
        promises.push(new Promise(resolve => {
            resolve(
                UserDAO.createUser(user)
            )
        }))
    }
    try {
        await Promise.all(promises);
        console.info('Init Users Success');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();