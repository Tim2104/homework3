const express = require('express')
const router = express.Router()
const { products, skills } = require('../data.json')

const nodemailer = require('nodemailer')
const mailConfig = require('../mail-config.json')



router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функционал отправки письма.
  let transporter = nodemailer.createTransport(mailConfig.mail.smtp)

  mailOpt = {
    from: req.body.name,
    to: mailConfig.mail.smtp.auth.user,
    subject: mailConfig.mail.subject,
    text: req.body.message.trim().substr(0, 500) + `\n от: <${req.body.email}>`
  }

  transporter.sendMail(mailOpt, (err, inf) => {

    if(err) {
      //let msgemail = res.json({msg: 'ошибка! письмо не отправлено', status: 'error'})
      res.render('pages/index', { title: 'Main page', products, skills, msgemail: 'ошибка! письмо не отправлено' })
    }
    else {
      //let msgemail = res.json({msg: 'письмо отправлено!', status: 'ok'})
      res.render('pages/index', { title: 'Main page', products, skills, msgemail: 'письмо отправлено!'})
    }
  })


  //res.send('Реализовать функционал отправки письма')
})

module.exports = router
