const express = require("express");
const port  = process.env.PORT || 3000;
const app = express();
const models = require('./models/Association');
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(cors());
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const createTable = ()=>{
    let files = [ 'Category','Product','User', 'Cart_Item', 'Order', 'Order_Detail','Order_History']
   
    let models = files.map(file => require('./models/'+file))
    models.map(model => model.sync()) 

}

const Controller = (controller)=> require('./controller/'+controller);

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
    createTable()
})

app.post('/register/newUser', Controller('User').storeUser);

app.get('/product/:id', Controller('Product').getProductById);
app.get('/products', Controller('getAllProducts'));


app.get('/categories', Controller('Category').getAllCategories);
app.get('/category/:id/products', Controller('Product').getProductsByCategory);

//app.get('/user/:id/cart', Controller('getCart'));

app.use((err, req, res, next)=> res.status(404));
app.use((err, req, res, next)=> res.status(500));