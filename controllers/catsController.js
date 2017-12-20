const express = require('express')
const router = express.Router()

const catsFromDatabase = require('../cats')

// NEW route
// - Renders the new cat form
router.get('/new', (request, response) => {

    // Render the new, empty form to create a new cat
    response.render('cats/new')
})

// CREATE route
// - receives the form POST for new cats
router.post('/', (request, response) => {

    // 'body-parser' will hand us the new cat info
    // from the form as 'request.body'
    const newCat = request.body

    // Once we have the new cat object from the request,
    // we add that cat to our collection of cats
    // AKA "save it to the database"
    catsFromDatabase.push(newCat)

    // Once we have saved our new cat,
    // we'll redirect back to the cats INDEX page
    response.redirect('/cats')
})

// INDEX route
// - displays all cats
router.get('/', (request, response) => {

    // Render a view with all cats from the database
    response.render('cats/index', {
        cats: catsFromDatabase
    })
})

// SHOW route
// - finds one cat by ID and displays it
router.get('/:id', (request, response) => {

    // First, we need to get the ID of the cat we want to display
    const catId = request.params.id

    // Once we have the cat ID, we find the cat in our 
    // collection of cats using the ID
    const catWithId = catsFromDatabase[catId]

    // Once we have found the cat, we render it
    // (along with an ID so we can build the DELETE
    // and EDIT links)
    response.render('cats/show', {
        id: catId,
        cat: catWithId
    })
})

// EDIT route
// - Renders the pre-populated form we'll use to update cat info
router.get('/:id/edit', (request, response) => {

    // First, we need to get the ID of the cat we want to edit
    const catId = request.params.id

    // Once we have the cat ID, we find the cat in our 
    // collection of cats using the ID
    const catWithId = catsFromDatabase[catId]

    // Once we have found the cat, we render a 
    // form using the cat's data to pre-populate 
    // the form inputs via the HTML 'value' attribute.
    // We also pass along the ID of the cat so we can 
    // have the form's PUT request update the correct 
    // cat later on.
    response.render('cats/edit', {
        id: catId,
        cat: catWithId
    })
})

// UPDATE route
router.put('/:id', (request, response) => {
    // First, we grab the updated info from the 
    // request body. Remember that 'body-parser' 
    // lets us receive this info in the proper JS
    // object format
    const updatedCatInfo = request.body

    // We also need to grab the ID of the particular
    // cat that we are going to update.
    const catId = request.params.id

    // Finally, we need to grab the particular cat object
    // that we are going to update, using the ID from the
    // parameters.
    const originalCatInfo = catsFromDatabase[catId]

    // Once we have the original cat info from the 
    // "database", we'll need to make sure each attribute
    // is updated with the new info the user entered into
    // the form.
    originalCatInfo.name = updatedCatInfo.name
    originalCatInfo.age = updatedCatInfo.age

    // Once we have updated the cat info, we'll redirect
    // to the cat's SHOW page so the user can verify that
    // their updated info is as expected.
    response.redirect(`/cats/${catId}`)
})

// DELETE route
router.get('/:id/delete', (request, response) => {
    // First, we'll grab the ID of the cat we want to delete.
    const catId = request.params.id

    // Next, we'll delete that cat from our cat collection.
    catsFromDatabase.splice(catId, 1)

    // Once we have deleted the cat from our collection,
    // we'll redirect to the the INDEX page and we should no
    // longer see our cat.
    response.redirect('/cats')
})

module.exports = router