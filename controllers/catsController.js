const express = require('express')
const router = express.Router()

const catsFromDatabase = require('../cats')

// NEW route
router.get('/new', (request, response) => {
    response.render('cats/new')
})

// CREATE route
router.post('/', (request, response) => {
    const newCat = request.body

    catsFromDatabase.push(newCat)

    response.redirect('/cats')
})

// INDEX route
router.get('/', (request, response) => {
    response.render('cats/index', {
        cats: catsFromDatabase
    })
})

// SHOW route
router.get('/:id', (request, response) => {
    const catId = request.params.id
    const catWithId = catsFromDatabase[catId]

    response.render('cats/show', {
        id: catId,
        cat: catWithId
    })
})

// EDIT route
router.get('/:id/edit', (request, response) => {
    const catId = request.params.id
    const catWithId = catsFromDatabase[catId]

    response.render('cats/edit', {
        id: catId,
        cat: catWithId
    })
})

// UPDATE route
router.put('/:id', (request, response) => {
    const updatedCatInfo = request.body
    const catId = request.params.id

    const originalCatInfo = catsFromDatabase[catId]
    originalCatInfo.name = updatedCatInfo.name
    originalCatInfo.age = updatedCatInfo.age

    response.redirect(`/cats/${catId}`)
})

// DELETE route
router.get('/:id/delete', (request, response) => {
    const catId = request.params.id

    catsFromDatabase.splice(catId, 1)

    response.redirect('/cats')
})

module.exports = router