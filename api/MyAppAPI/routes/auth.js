const models = require('@MyApp/setup')

module.exports = (app) => {
  const api = app.app.MyAppAPI.controllers.auth
  // console.log(app)
  app.route('/')
     .get((req, res) => res.send('My App API'))
  app.route('/app/auth')
     .post(api.login(models.User))
}
