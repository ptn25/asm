var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://ptn:abc12345@cluster0.83sovm6.mongodb.net/?retryWrites=true&w=majority'
const { ObjectId } = require('bson')

async function getDB() {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1006")
    return db
}

async function insertNewProduct(newProduct) {
    let db = await getDB()
    let id = await db.collection("toys").insertOne(newProduct)
    return id
}

async function getAllProduct() {
    let db = await getDB()
    let results = await db.collection("toys").find().toArray()
    return results
}

async function findProductByName(id) {
    let db = await getDB()
    const productToEdit = await db.collection("toys").findOne({ _id: ObjectId(id) })
    return productToEdit
}

async function deleteProductById(id) {
    let db = await getDB()
    await db.collection("toys").deleteOne({ _id: ObjectId(id) })
}

async function findProductByName(nameSearch) {
    let db = await getDB()
    const result = await db.collection("toys").find({name: new RegExp(nameSearch, 'i')}).toArray()
    console.log(nameSearch)
    console.log(result)
    return result;
}

module.exports = { findProductByName, insertNewProduct, getAllProduct, deleteProductById }