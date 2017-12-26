# boilermaker

After forking or cloning, don't forget to `npm install`.

Any OAuth external API clientID's & clientSecrets must also be updated via `server/auth/keys.js`.

If applicable, once you've ensured that `postgres` is running (e.g. by trying to start a `psql` shell), you can execute `npm run seed` to seed the database with fake data.

Otherwise, don't forget to `createdb dbName`.

Finally, fire it up with `npm run start:dev` and go to http://localhost:1337/.

Alternatively, `npm run start` fires up `node index.js` only without webpack.

----------

# Basic Server

Decide how your index.html will be served up to the browser. Will you use an express server, or a quicker solution like webpack-dev-server, http-server, or some other static file server?

Tools like webpack-dev-server and http-server are very useful - they will serve up static files (including your index.html) from the folder you start them from. This is great if you want to start writing a client-side application but don't want to write a full express server yet (or if you don't need one - for example, if you write an application that uses a cloud database like Firebase, or a simple client app that just needs to make AJAX requests to some external APIs).

You could install them on a project-by-project basis, or install them globally using the -g flag.
