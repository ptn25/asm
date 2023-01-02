var express = require('express')
const { findProductByName, insertNewProduct, getAllProduct, updateProduct, findProductById, deleteProductById } = require('./databaseHandler')
var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.post('/search', async(req,res)=>{
    const searchName = req.body.txtName
    const searchResult = await findProductByName(searchName)
    res.render('view', {results:searchResult})
})

app.post('/edit',async(req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const pictureURL = req.body.txtPic
    const category = req.body.txtCategory
    await updateProduct(id, name, price, pictureURL, category)
    res.redirect('/view')
})

app.get('/edit', async(req,res)=>{
    const id = req.query.id
    const productToEdit = await findProductById(id)
    res.render("edit", {product:productToEdit})
})

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    await deleteProductById(id)
    res.redirect('/view')
})

app.get('/view',async (req,res)=>{
    let results = await getAllProduct()
    res.render('view',{'results':results})
})

app.post('/new',async (req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let pictureURL = req.body.txtPic
    let category = req.body.txtCategory
    let newProduct = {
        name : name,
        price: Number.parseFloat(price) ,
        picture: pictureURL,
        category: category
    }
    // if(name.length < 5)
    // {    
    //     // res.status(400).send({message:"Content cannot be empty!"});
    //     // return;
    //     alert("Name must be longer than 5 characters! Please Try Again!");
    // }else
    await insertNewProduct(newProduct)
    res.redirect('/view')
})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is up!")


