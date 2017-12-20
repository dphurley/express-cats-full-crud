const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'hbs')

const catsController = require('./controllers/catsController')
app.use('/cats', catsController)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})