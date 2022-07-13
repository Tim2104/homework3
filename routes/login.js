const express = require('express')
const router = express.Router()
const session = require('express-session')

const { adminAuth } = require('../data.json')



router.get('/', (req, res, next) => {
  
  if(req.session.admstate === 1) res.render('pages/admin', { title: 'Admin'})

  res.render('pages/login', { title: 'SigIn page' })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функцию входа в админ панель по email и паролю
  
  const login = req.body.email
  const pass = req.body.password

  
  req.session.admstate = 1

  if(login === adminAuth[0].login && pass === adminAuth[0].pass) {
    
    res.render('pages/admin', { title: 'Admin'})
  }
  else {
    res.render('pages/login', { title: 'SigIn page', msglogin: 'проверьте правильность веденных данных!'})
  }


  //res.send('Реализовать функцию входа по email и паролю')
})

router.get('/admin', (req, res, next) => {
  res.render('pages/admin', { title: 'Admin'})
})

module.exports = router
