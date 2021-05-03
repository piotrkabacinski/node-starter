# Heroku deployment

1. Create new app

   <small>Apps dashboard: `New > Create new app`</small>

2. Set Node.js buildpack

   <small>`Settings > Buildpack > Add buildpack > Node.js`</small>

3. Add Redis and Postgres Add-ons

   <small>`Resources` > Search for `Heroku Postgres` and `Heroku Redis` and add them. Heroku will create required environment variables for you.</small>

4. Deploy app to Heroku

   <small>

   Heroku Git URL can be found in `Settings > App Information` section.

   `git remote add heroku https://git.heroku.com/<app name>.git`

   `git push heroku HEAD:master`
   </small>

5. If it's a production deployment make sure you are aware of [synchronize](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#how-migrations-work) value in production DB connection: `src/db/index.ts`. By default it refers to value in `ormconfig.js`.
