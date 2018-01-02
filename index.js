// this means that we need to make sure our local NODE_ENV variable is in fact set to 'development'
// Node may have actually done this for you when you installed it! If not though, be sure to do that.
if (process.env.NODE_ENV === 'development') {
  require('./server/auth/localSecrets'); // this will mutate the process.env object with your secrets & run your app after you're sure the env variables are set
}

const { db } = require('./server/db/models');
const app = require('./server');

const PORT = process.env.PORT || 1337; // this can be very useful if you deploy to Heroku!

db.sync()
  .then(() => {
    console.log('The postgres server is up and running.');
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`The collective is listening on PORT ${PORT}...`);
    });
  })
  .catch(console.error);
