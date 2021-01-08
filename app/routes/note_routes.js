const ObjectID = require('mongodb').ObjectID

const db = require("../../config/db")

module.exports = function(app, client) {
   
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id': new ObjectID(id)}
        var database = client.db('mytestingdb')
        database.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                })
            } else {
                res.send(item)
            }
        })
    })

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id': new ObjectID(id)}
        var database = client.db('mytestingdb')
        database.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                })
            } else {
                res.send(`Note ${id} deleted`)
            }
        })
    })

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id': new ObjectID(id)}
        const note = {
            text: req.body.body,
            title: req.body.title
        }
        var database = client.db('mytestingdb')
        database.collection('notes').update(details, note, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                })
            } else {
                res.send(`Note ${id} updated`)
            }
        })
    })

    app.post('/notes', (req, res) => {
        const note = {
            text: req.body.body,
            title: req.body.title
        }
        var database = client.db('mytestingdb')
        database.collection('notes').insertOne(note, (err, results) => {
            if (err) {
                res.send({
                    'error' : 'An error has occured'
                }) 
            }  else {
                res.send( results.ops[0])
            }
            client.close();
        })
    })

}