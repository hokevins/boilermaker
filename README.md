# boilermaker

After forking or cloning, don't forget to `npm install`.

If applicable, once you've ensured that `postgres` is running (e.g. by trying to start a `psql` shell), you can execute `npm run seed` to seed the database with fake data (assuming you've populated the seed.js file).

Otherwise, don't forget to *`createdb {dbName}`*.

Finally, fire it up with `npm run start:dev` and go to http://localhost:1337/.

Alternatively, `npm run start` fires up `node index.js` only without webpack.

----------

# Basic Server

Decide how your index.html will be served up to the browser. Will you use an express server, or a quicker solution like webpack-dev-server, http-server, or some other static file server?

Tools like webpack-dev-server and http-server are very useful - they will serve up static files (including your index.html) from the folder you start them from. This is great if you want to start writing a client-side application but don't want to write a full express server yet (or if you don't need one - for example, if you write an application that uses a cloud database like Firebase, or a simple client app that just needs to make AJAX requests to some external APIs).

You could install them on a project-by-project basis, or install them globally using the -g flag.

----------

# CSS Styling

You may wish to style your app with either the `main.css` file as specified inside the index.html inside of the public folder, OR you may also use the `index.css` file using the same entry point as webpack's JavaScript through style-loader and css-loader.

Use it as an index for other css files that you @import in.

----------

# Authentication & OAuth2.0

Any OAuth external API clientID's & clientSecrets must be updated via `server/auth/localSecrets.js` (which has been added to `.gitignore` for safe-keeping on your local IDE.

Had to downgrade to pg@6.4.2 in order to avoid OAuth type error.
(https://github.com/sequelize/sequelize/issues/8005)

----------

# Future to-do's:

See workshop tab:  **Environment Variables**
- `process.env.NODE_ENV === 'development'` inside of `index.js`.
- `process.env.GOOGLE_CLIENT_ID = 'etc';`
- `process.env.GOOGLE_CLIENT_SECRET = 'etc';`
- And in your app's entry point, `index.js`:
`require('./localSecrets');` // mutate the process.env object with your variables
`require('./server');`       // run your app after you're sure the env variables are set.

# TESTING
See tests folder and already npm installed the following:
- mocha
- chai
- supertest
- enzyme
Note that you may need to install an additional dev dependency: react-addons-test-utils or react-test-renderer—based on your current react version. See enzyme's installation details for more. (https://github.com/airbnb/enzyme#installation)

These libraries are the bare minimum we need to get off the ground with your testing. However, here's a list of some other handy libraries that may come in handy:

- sinon -> provides spies, stubs and mocks
- chai-as-promised -> extends chai with assertions specific to promises
- chai-things -> extends chai with helpful assertions specific to arrays
- sinon-as-promised -> extends sinon with sugar for promises
- chai-enzyme -> extends chai with some convenience functions for working with enzyme

N.B: In particular, chai supports a wide ecosystem of extensions. If you find yourself writing verbose code in order to make a particular assertion, take a moment and see if someone's written a plugin that could make your life easier. Here's a full list of them. (http://chaijs.com/plugins/)

----------

THANKS FOR PLAYING! hadoken.
