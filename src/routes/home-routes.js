const bcrypt = require('bcrypt')
const express = require('express')
const route = express.Router();

const Account = require('../model/account')
const AccountRepository = require('../repository/account-repo')

const aRepo = new AccountRepository()

route.get('/', (_, res) => {
    res.render('pages/home')
})

route.get('/signin', (_, res) => {
    res.render('pages/signin')
})


route.get('/signup', (_, res) => {
    res.render('pages/signup',  {error:null})
})

route.post('/signup', async (req, res) => {
    console.log(req.body)
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
    


    let ac = await aRepo.findByUsername(username)
    let em = await aRepo.findByEmail(email)

    if(ac.length == 0){
        if(em.length == 0){

            bcrypt.hash(password, 12, (_, hash) => {
                
                            let account = {
                                email: email,  
                                username: username, 
                                password: hash
                            };
                    
                            aRepo.insert(account)

                            res.render('pages/home')
            })

        }else {
            res.render('pages/signup', {error:{message: "O email informado ja foi cadastrado"}})
        }
    } else {
        res.render('pages/signup', {error:{ message: "O nome de usuario ja existe" }})
    }


})


module.exports = route