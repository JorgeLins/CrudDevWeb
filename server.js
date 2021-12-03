const dotenv = require('dotenv')
dotenv.config()

const session = require('express-session')
const express = require('express')
var expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3001

const sequelize = require('./src/database/index')
const routes = require('./src/routes/index')
const cookie = require('cookie-parser')

const passport = require('passport')
const Strategy = require('passport-local')

const AccountRepository = require('./src/repository/account-repo')
const bcrypt = require('bcrypt')

passport.use(new Strategy( 
  async (username, password, done) => {
    let aRepo = new AccountRepository();

    let account = await aRepo.findByUsername(username)

    if(account.length == 0){ 
      return done(null, false), {message: 'Usuario e senhas invalidos'}
    }


    bcrypt.compare(password, account[0].password, (err, result) => {
      if(err) {
        return done(err)
      }
      if(!result) {
        return done(null, false, {message: 'senhas invalidos'})
      }
 
      return done(null, account)
    });
}));

passport.serializeUser(function(user, done) {
  return done(null, {id: user.id});
});

passport.deserializeUser( async (id, done) => {
  let aRepo =  new AccountRepository();
  let account = await aRepo.find(id)

  return done(null, account)
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))
app.use(session({
  secret: 's3cr3t',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(cookie())
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes)
app.listen(port, async () => {

await sequelize.sync({ force: false });


  console.log(`Iniciado na porta ${port}`)
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})