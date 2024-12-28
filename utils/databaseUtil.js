const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb://0.0.0.0/completecoding";

let _db;

const mongoConnect = (callback) => { 
    MongoClient.connect(MONGO_URL).then(client => {
        callback();
        _db = client.db('completecoding')
    }).catch(err => {
        console.log(`Database inside  client error : `, err)
    })

    
}

const getDB = () => {
    if(!_db){
        throw new Error('Mongo not connected')
    }
    return _db;
}

module.exports = {mongoConnect, getDB};
