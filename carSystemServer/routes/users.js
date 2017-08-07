const express = require('express')
const usersData = require('../data/users')
const authCheck = require('../middleware/auth-check')
const router = new express.Router()


router.get('/profile/:name/:id', authCheck, (req, res) => {
  const reqId = req.params.id
  const responseUser = usersData.findById(+reqId)
  if (!responseUser) {
    return res.status(200).json({
      success: false,
      message: 'User does not exist!'
    })
  }
  return res.status(200).json({
    success: true,
    message: 'User fetched successfully!',
    user: responseUser
  })
})

router.put('/profile/edit/:name/:id', authCheck, (req, res) => {
  const reqUser = req.body
  const reqId = req.params.id
  let responseUser = (usersData.updateProfile(reqUser, reqId))
  return res.status(200).json({
    success: true,
    message: 'User edited successfully!',
    user: responseUser
  })  
})
module.exports = router