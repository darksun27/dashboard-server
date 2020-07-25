const Authentication = require('./controllers/authentication');
const Entry = require('./controllers/entry');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const isAdmin = require('./controllers/admin')
module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.post('/newEntry',[requireAuth, isAdmin.isAdmin], Entry.newEntry);
  app.get('/getSales', requireAuth, Entry.getSales);
  app.get('/getSalesPerson', requireAuth, isAdmin.isAdmin, Entry.getSalesPerson);
}
