const express = require('express')
const authCheck = require('../middleware/auth-check')
const carsData = require('../data/cars')
const responseGenerator = require ('./response-generator.js')

const router = new express.Router()

router.put('/edit/:id', authCheck, (req, res) => {
  const carReq = req.body
  const idReq = req.params.id
  
  let responseCar = carsData.updateCar(carReq, +idReq)
  let responseObj = responseCar
    ? responseGenerator('Car edited successfully!', responseCar)
    : responseGenerator('An error occurred, please try again after 10 seconds!')
    
  return res.status(200).json(responseObj);
})

router.post('/create', authCheck, (req, res) => {
  const carReq = req.body
  let responseCar = carsData.save(carReq)

  let responseObj = responseCar
    ? responseGenerator('Car added successfully!', responseCar)
    : responseGenerator('An error occurred, polease try again after 10 seconds!')
    
  return res.status(200).json(responseObj);
})

router.get('/getSixCars', (req, res) => {
  const cars = carsData.sixCars()
  
  let responseObj = cars
    ? responseGenerator('Car added successfully!', cars)
    : responseGenerator('An error occurred, please try again after 10 seconds!')
  
  return res.status(200).json(responseObj)
})

router.get('/all', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const cars = carsData.all(page)
  let responseObj = cars
    ? responseGenerator('Car added successfully!', cars)
    : responseGenerator('An error occurred, please try again after 10 seconds!')
  
  return  res.status(200).json(responseObj)
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = Number(req.params.id)
  const car = carsData.findById(id)
   let responseObj = car
    ? responseGenerator('Car fetched successfully!', car)
    : responseGenerator('An error occurred, please try again after 10 seconds!')
  
  return  res.status(200).json(responseObj)
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

router.post('/comments/:id', authCheck, (req, res) => {
  let reqId = req.params.id
  let reqComment = req.body
  let responseCar = carsData.createComment(reqComment, +reqId)
  let response = '';
  if (car) {
    response = handleResponse(zdrasti , car)
  }
  if (!responseCar) {
    return res.status(200).json({
      success: false,
      message: 'Car does not exists!'
    })
  }
  return res.status(200).json({
    success: true,
    message: 'Comment added successfuly.',
    car: responseCar
  })
})

module.exports = router
