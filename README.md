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

Any OAuth external API clientID's & clientSecrets must be updated via `server/auth/keys.js` (which has been added to `.gitignore` for safe-keeping on your local IDE.

----------

THANKS FOR PLAYING!
