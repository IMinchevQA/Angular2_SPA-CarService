const express = require('express')
const authCheck = require('../middleware/auth-check')
const carsData = require('../data/cars')

const router = new express.Router()

router.post('/edit/:id', (req, res) => {
  const carReq = req.body
  const idReq = req.params.id

  let responseCar = carsData.updateCar(carReq, +idReq)
  return res.status(200).json({
    success: true,
    message: 'Car edited successfully!',
    responseCar
  })
})

router.post('/create', (req, res) => {
  const carReq = req.body

  let responseCar = carsData.save(carReq)
  return res.status(200).json({
    success: true,
    message: 'Car added successfully!', 
    responseCar
  })
})

router.get('/getSixCars', (req, res) => {
  const cars = carsData.sixCars()
  res.status(200).json(cars)
})
router.get('/all', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const cars = carsData.all(page)
  res.status(200).json(cars)
})

router.get('/details/:id', (req, res) => {
  const id = Number(req.params.id)
  const car = carsData.findById(id)
  if (!car) {
    return res.status(200).json({
      success: false,
      message: 'Car does not exists!'
    })
  }

  let response = {
    id,
    make: car.make,
    model: car.model,
    engine: car.engine,
    price: car.price,
    image: car.image,
    date: car.date,
    owner: car.owner,
    description: car.description,
    comments: car.comments
  }
  res.status(200).json(response)
})

router.get('/details/:id/reviews', authCheck, (req, res) => {
  const id = req.params.id

  const car = carsData.findById(id)

  if (!car) {
    return res.status(200).json({
      success: false,
      message: 'Car does not exists!'
    })
  }
  const response = carsData.allReviews(id)
  res.status(200).json(response)
})

router.get('/mine', authCheck, (req, res) => {
  const user = req.user.email

  const cars = carsData.byUser(user)

  res.status(200).json(cars)
})

module.exports = router
