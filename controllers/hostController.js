const Home = require('../models/home')
const Favourites = require('../models/favourites')

// Home adding form filling and accepting pages
exports.getAddHome =  (req,res)=>{
    const editing = false;
    res.render('host/edit-home.ejs', {title: 'Add-Home', editing})
}

exports.getEditHome =  (req,res)=>{
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
    Home.findById(homeId).then((homeFound)=>{
        if(!homeFound){
            res.redirect('/host/host-home-list')
        }else{
            res.render('host/edit-home.ejs', {editing, homeFound, title: 'Edit-Home'})
        }
    })
}

exports.getHostHome = (req, res) => {
    Home.fetchAll().then((registeredHomes)=>{
        res.render('host/host-home-list', {registeredHomes:registeredHomes, title: 'Host Homes List' });
    });
}


exports.postAddHome = (req,res)=>{
    const {houseName, price, location, rating} = req.body;
    const home = new Home(houseName, price, location, rating)
    home.save().then(()=>{
        console.log('home Saved Successfully');
    })
    res.redirect('/host/host-home-list')
}

exports.postEditHome = (req,res)=>{
    const {_id, houseName, price, location, rating} = req.body;
    const home = new Home(houseName, price, location, rating, _id)
    home.save().then((result) =>{})
    res.redirect('/host/host-home-list')
}

exports.postDeleteHome = (req,res)=>{
    const homeId = req.params.homeId;
    Home.deleteById(homeId).then((error)=>{
        Favourites.deleteById(homeId);
        if(!error){
            console.log('hostController :: postDeleteHome :: error', error);
        }
        res.redirect('/host/host-home-list')
    })    
}