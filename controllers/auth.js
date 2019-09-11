require('dotenv').config()
let jwt = require('jsonwebtoken')
let router = require('express').Router()
let db = require('../models')

router.post('/login', (req,res)=>{
  res.send('STUB - POST /auth/login')
})

router.post('/signup', (req,res)=> {
  db.User.findOne({
    email: req.body.email
  })
  .then(user =>{
    if(user) {
      return res.status(409).send({ message: 'Email address in use '})
    }
    db.User.create(req.body)
    .then(newUser =>{
      let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 8
      })
      res.send({ token })
    })
    .catch(err => {
      console.log('Error when creating new user', err)
      res.status(500).send({ message: 'Error creating user'})
    })
  })
  .catch(err =>{
    console.log('Error in POST /auth/signup', err)
    res.status(503).send({ message: 'Something wrong, prob DB related. Or you made a typo. One of those.' })
  })
})

router.get('/current/user', (req,res)=>{
  res.send('STUB - Current User Data')
})

module.exports = router