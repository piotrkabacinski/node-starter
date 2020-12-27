# Heroku deployment

1. Create new app

   <small>In app dashboard: `New > Create new app`</small>

2. Set Node.js buildpack

   <small>`Settings > Buildpack > Add buildpack > Node.js`</small>

3. Add Redis and Postgres Add-ons

   <small>`Resources` > Search for `Heroku Postgres` and `Heroku Redis` and add them.</small>

4. Add Heroku git remote server

   <small>
     Heroku Git URL can be found in `Settings > App Information` section.

   `git remote add heroku https://git.heroku.com/<app name>.git`
   </small>

5.
