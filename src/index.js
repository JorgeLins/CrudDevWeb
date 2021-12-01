const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
var expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3001

const sequelize = require('./database/index')

const routes = require('./routes/index')


app.use(express.json());


app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

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