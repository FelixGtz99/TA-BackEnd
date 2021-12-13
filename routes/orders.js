const express = require('express')
const router = express.Router()
const {postItem,getItem, updateItem, checkItem} =require('../controllers/order')
//TODO: Implementar validadores

router.post('/', postItem)


router.get('/:id', getItem)


router.patch('/:id', updateItem)


router.patch('/confirm/:id', checkItem)

module.exports = router