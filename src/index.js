const express = require('express')
const app = express()
const port = 3001

const sequelize = require('./database/index')

const userRouter = require('./routes/user-routes')


app.use(express.json());

app.use('/user', userRouter)

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