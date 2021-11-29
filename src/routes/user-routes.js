const express = require('express')
const router = express.Router();

const UserRepository = require('../repository/user-repo')
const User = require('../model/User');
const { urlencoded } = require('express');

let uRepo = new UserRepository()

router.get('/', async (req, res) => {

  const user = await User.findAll()

    return res.status(200).json(user)
  })
  
  router.get('/:id', async (req, res) => {
  
    let id = req.params['id']
  
    let user = await uRepo.find(id)

    if(user == undefined){
        resp = {
            status:'ERROR',
            description: `User ${uid} não encontrado.`
        }
        return res.status(404).json(resp)
    }
  
    return res.status(200).json(user)
  })
  
  router.post('/', async (req, res) => {
    let u = req.body
    console.log(u)


  
    if(u.nome == undefined || u.email == undefined){
        resp = {
            status:'ERROR',
            description: `User must be provided`
        }
        return res.status(404).json(resp)
    } 
    

    const user = await uRepo.insert(u)

    res.send("POST")
  })
  
  router.put('/:id', async (req, res) => {
  
    let id = req.params['id']
    let u = req.body
  
    let user = await uRepo.find(id)
  
    console.log(id)

    if(user == undefined){
        resp = {
            status:'ERROR',
            description: `User ${uid} não encontrado.`
        }
        return res.status(404).json(resp)
    }
  
    user.nome = u.nome;
    user.email = u.email;
    

    user = await uRepo.update(id, user)

  
    return res.status(200).json("Atualizado")
  })
  
  router.delete('/:id', async (req, res) => {
  
    let id = req.params['id']
    let user = await uRepo.find(id)


    if(user.length > 0 ){
      await uRepo.delete(id)
    }

    if(user == undefined){
        resp = {
            status:'ERROR',
            description: `User ${uid} não encontrado.`
        }
        return res.status(404).json(resp)
    }
  
    

    
  
    res.send(`DELETE with ID(${id})`)
  })
  

  module.exports = router;