const express = require('express')
const userRouter = require('./user-routes')
const homeRoutes = require('./home-routes')

const api = express.Router();
api.use('/users', userRouter)



const route = express.Router();
route.use('/api', api);
route.use('/', homeRoutes);

module.exports = route