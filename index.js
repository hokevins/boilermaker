const app = require('./server');
const PORT = process.env.PORT || 1337;
const { db } = require('./server/db/models');


db.sync()
  .then(() => {
    console.log('The postgres server is up and running.');
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`The collective is listening on PORT ${PORT}...`);
    });
  })
  .catch(console.error);
