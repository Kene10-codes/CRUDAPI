const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const db = require('./config/db')

const port = process.env.mongo_host || 8000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))


MongoClient.connect(db.url, function (err, client) {
  if (err) throw err;
  require('./app/routes')(app, client)
    app.listen(port, () => {
    console.log(`server is runnning on port ${port}`)
  });
}); 