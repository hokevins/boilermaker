# boilermaker

After forking or cloning, don't forget to `npm install`.

Any OAuth external API clientID's & clientSecrets must also be updated via `server/auth/keys.js`.

If applicable, once you've ensured that `postgres` is running (e.g. by trying to start a `psql` shell), you can execute `npm run seed` to seed the database with fake data.

Finally, fire it up with `npm run start:dev` and go to http://localhost:1337/.

Alternatively, `npm run start` fires up node index.js only without webpack.
