var express = require('express')
const hbs = require ('hbs')
const { findProductByName, insertNewProduct, getAllProduct, deleteProductById } = require('./databaseHandler')
var app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

hbs.registerHelper('color', function(price)
{
    if (price > 50)
    {
        return 'green'
    }
    else
    {
        return 'blue'
    }
})

app.post('/search', async (req, res) => {
    const searchName = req.body.txtName
    const searchResult = await findProductByName(searchName)
    res.render('view', { results: searchResult })
})

app.get('/delete', async (req, res) => {
    const id = req.query.id
    await deleteProductById(id)
    res.redirect('/view')
})

app.get('/view', async (req, res) => {
    let results = await getAllProduct()
    res.render('view', { 'results': results })
})

app.post('/new', async (req, res) => {
    let name = req.body.txtName
    let price = req.body.txtPrice
    let pictureURL = req.body.txtPic
    let category = req.body.txtCategory
    let weight = req.body.txtWeight
    let newProduct = {
        name: name,
        price: Number.parseFloat(price),
        picture: pictureURL,
        category: category,
        weight: Number.parseFloat(weight)
    }
    if (name.length < 5) {
        res.render('newProduct', { 'warning': "Name field must be at least 5 characters! Please try again!" })
    }
    else if (pictureURL.endsWith('png')) {
        res.render('newProduct', {'warning': "The image is not in the correct format! Please try again!" })
    }
    else if (category.length < 1) {
        res.render('newProduct', { 'warning': "Catergory cannot be blank! Please try again!" })
    }
    else {
        await insertNewProduct(newProduct)
        res.redirect('/view')
    }
})

app.get('/new', (req, res) => {
    res.render('newProduct')
})

app.get('/', (req, res) => {
    res.render('home')
})



const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is up!")