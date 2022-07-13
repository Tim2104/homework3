const { application } = require('express')
const express = require('express')
const router = express.Router()
const multer  = require("multer");  // загрузка файлов
const fs = require('fs')
const path = require('path')
const data = require('../data.json')

const upload = multer({dest: 'public/upload'});

router.get('/', (req, res, next) => {
  
  // TODO: Реализовать, подстановку в поля ввода формы 'Счетчики'
  // актуальных значений из сохраненых (по желанию)
  res.render('pages/admin', { title: 'Admin page' })
})

router.post('/skills', (req, res, next) => {
  const newSkills = {
    age: req.body.age,
    concerts: req.body.concerts,
    cities: req.body.cities,
    years: req.body.years
  }

  let newSkillsKeys = []
  let n = 0

  for(let i in newSkills) newSkillsKeys.push(i);

  for(let i in data.skills) {
    data.skills[i].number = newSkills[newSkillsKeys[n]];
    n++;
  }
  console.log(data)

  newData = JSON.stringify(data)

  //fs.writeFile('../data.json', newData, (err) => {})


  /*
  TODO: Реализовать сохранение нового объекта со значениями блока скиллов

    в переменной age - Возраст начала занятий на скрипке
    в переменной concerts - Концертов отыграл
    в переменной cities - Максимальное число городов в туре
    в переменной years - Лет на сцене в качестве скрипача
  */
  //res.send('Реализовать сохранение нового объекта со значениями блока скиллов')
})

router.post('/upload', upload.single('filedata'), (req, res, next) => {

  let filedata = req.file
  let fileName = filedata.filename + '.' + filedata.mimetype.split('/')[1]


  const newProduct = {
    //src:
    name: req.body.name,
    price: req.body.price
  }
  data.products.push(newProduct)
  
  //fs.writeFile('../data.json', JSON.stringify(data), (err) => {})


  /* TODO:
   Реализовать сохранения объекта товара на стороне сервера с картинкой товара и описанием
    в переменной photo - Картинка товара
    в переменной name - Название товара
    в переменной price - Цена товара
    На текущий момент эта информация хранится в файле data.json  в массиве products
  */
  //res.send('Реализовать сохранения объекта товара на стороне сервера')
})

module.exports = router
