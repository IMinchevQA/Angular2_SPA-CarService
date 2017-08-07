const express = require('express')
const authCheck = require('../middleware/auth-check')
const ownersData = require('../data/owners')
const carsData = require('../data/cars')
const router = new express.Router()

router.post('/create', authCheck, (req, res) => {
  const ownerReq = req.body

  let responseOwner = ownersData.save(ownerReq)
  return res.status(200).json({
    success: true,
    message: 'Owner added successfully!', 
    responseOwner
  })
})

router.get('/all', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const cars = ownersData.all(page)
  res.status(200).json(cars)
})

router.get('/details/:name/:id', authCheck, (req, res) => {
  const name = req.params.name
  const page = parseInt(req.query.page) || 1
  const id = req.params.id
  const owner = ownersData.findById(+id)
  const ownerCars = carsData.all(page, name)
  if (!owner) {
    return res.status(200).json({
      success: false,
      message: 'Owner does not exists!'
    })
  }

  let response = {
    id,
    name: owner.name,
    image: owner.image,
    ownerCars: ownerCars
  }
  res.status(200).json(response)
})

module.exports = router
