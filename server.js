const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModels')
const app = express()


//Middleways
//To let our application understand json datatypes
app.use(express.json())

//To let our application understand form datatypes
app.use(express.urlencoded({extended: false})) 

//Routes
app.get('/', (req, resp)=>{
    resp.send("This is homepage")
})

//Post Request Api to save data in database
app.post('/product', async(req, resp)=>{
   try {

    // const existingProductInRequest = req.body.name ;
    
    //to interact with db async...wait is used
     const product = await Product.create(req.body)
     resp.status(200).json(product);
   } catch (error) {
    console.log(error.message);
    resp.status(500).json({message: error.message})
   }
})

//Get Request Api to fetch data from database
app.get('/products', async(req, resp)=>{
    try {
        const products = await Product.find({})
        resp.status(200).json(products);
     } catch (error) {
        console.log(error.message);
        resp.status(500).json({message: error.message})  
    }
})

//Get Reuest Api to fetch data by data id
app.get('/products/:id', async(req, resp)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        resp.status(200).json(product)
     } catch (error) {
        console.log(error.message);
        resp.status(500).json({message: error.message})  
    }
})

//Put Request Api to update data in database
app.put('/products/:id', async(req, resp)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
        return resp.status(404).json({message: `Cannot find any product with id ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        resp.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message);
        resp.status(500).json({message: error.message})
    }
})


//Delete Request Api to update data in database
app.delete('/products/:id', async(req, resp)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if(!product){
        return resp.status(404).json({message: `Cannot find any product with id ${id}`})
        }
        resp.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        resp.status(500).json({message: error.message})
    }
})



// mongoose.set("strictQuery", false)

//Database Connection
mongoose.connect(
    "mongodb://0.0.0.0/node-crud",
    {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    })
    .then(() => 
    console.log('DB CONNECTED'))
    app.listen(3000, ()=>{
        console.log("Node App is running on Port 3000.")
    })
    .catch((err) => { 
        console.error(err); 
    });

)
