const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'demo-dani';
const client = new MongoClient(url);

client.connect(function (err) {
    if (err) {
        console.error(`ERROR connecting MongoDB`, err);
    }
    console.log("Connected successfully to server");
    app.get('/', function (req, res) {
        res.send('bienvenidos a la api');
    })

    app.post('/product', function (req, res) {
        client.db(dbName).collection(`producto`).insertOne(req.body).then(() => {
            return res.send(`guardado correctamente`);
        });
    })

    app.get('/products', function (req, res) {
        client.db(dbName).collection(`producto`).find({}).toArray().then((products) => {
            return res.json(products);
        });
    })

    app.listen(4000, () => {
        console.log('escuchando en puerto 4000')
    })
});


