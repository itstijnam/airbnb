const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");

module.exports = class Home {
    constructor(houseName, price, location, rating, _id){
        this.houseName = houseName;
        this.price = price; 
        this.location = location;
        this.rating = rating;
        if(_id){
            this._id = _id;
        }
    }

    save() {
        const db = getDB();
        if (this._id) { // Update
            const updateField = {
                houseName: this.houseName,
                price: this.price,
                location: this.location,
                rating: this.rating
            };
            return db
                .collection('home')
                .updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateField });
        } else { // Add new home
            return db.collection('home').insertOne(this);
        }
    }
    
    static fetchAll(){
        const db = getDB();
        return db.collection('home').find().toArray();
    }

    static findById(homeId){
        homeId = new ObjectId(String(homeId));
        const db = getDB();
        return db.collection('home').find({_id: homeId}).next();
    }

    static deleteById(homeId){
        homeId = new ObjectId(String(homeId));
        const db = getDB();
        return db.collection('home').deleteOne({_id: homeId});
    }
}