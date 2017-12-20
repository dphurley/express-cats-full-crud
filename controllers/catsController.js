const express = require('express')
const router = express.Router()

const catsFromDatabase = require('../cats')

router.get('/', (request, response) => {
    response.render('cats/index', {
        cats: catsFromDatabase
    })
})

router.get('/new', (request, response) => {
    response.render('cats/new')
})

router.get('/:id', (request, response) => {
    const catId = request.params.id
    const catWithId = catsFromDatabase[catId]

    response.render('cats/show', {
        cat: catWithId
    })
})

router.post('/', (request, response) => {
    const newCat = request.body

    catsFromDatabase.push(newCat)

    response.redirect('/cats')
})

module.exports = router