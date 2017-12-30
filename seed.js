const db = require('./server/db/_db');
const User = require('./server/db/models/user');

// const id = () => Math.floor((Math.random() * users.length) + 1);

const users = [
  {
    name: 'kevin ho',
    photo: '/images/default-photo.jpg',
    email: 'kevin@kevin.com',
    password: 'kevin',
    isAdmin: true,
    userId: 1
  },
  {
    name: 'karen ho',
    photo: '/images/default-photo.jpg',
    email: 'karen@karen.com',
    password: 'karen',
    isAdmin: false,
    userId: 1
  },
  {
    name: 'russell ho',
    photo: '/images/default-photo.jpg',
    email: 'russell@russell.com',
    password: 'russell',
    isAdmin: false,
    userId: 1
  }
];

User.belongsTo(User, {as: 'user'});

const seed = () =>
  Promise.all(users.map(user => User.create(user))
);

const main = () => {
  console.log('Syncing db...');
  db.sync({force: true})
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
