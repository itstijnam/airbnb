const Home = require('../models/home')
const Favourite = require('../models/favourites')

// Home Page

exports.getIndex = (req, res) => {
    Home.fetchAll().then((registeredHomes)=>{
        res.render('store/index', {registeredHomes:registeredHomes, title: 'airbnb Home' });
    });
}

exports.getHome = (req, res) => {
    Home.fetchAll().then((registeredHomes)=>{
        res.render('store/home-list', {registeredHomes:registeredHomes, title: 'Homes List' });
    });
}

exports.getBookings = (req,res)=>{
    Home.fetchAll().then((registeredHomes)=>{
        res.render('store/bookings', {registeredHomes:registeredHomes, title: 'Bookings'})
    })
}

exports.getHomeDetail = (req,res)=>{
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home=>{
        if(!home){
            res.redirect('/homes')
        }else{ 
            res.render('store/home-detail', {home:home, title: 'Home Detail'})
        }
    })
}

exports.getFavouriteList = (req,res)=>{
    Favourite.getFavourites().then(favourite => {
        favourite = favourite.map(fav => fav.houseId);
        Home.fetchAll().then(registeredHomes=>{
        const favouriteHomes = registeredHomes.filter((home) => favourite.includes(home._id.toString()));
        res.render('store/favourite-list', {favouriteHomes: favouriteHomes, title: 'Fav-Home'})
        })
    })
}

exports.postAddToFavourite = (req, res)=>{
    const homeId = req.body.id;
    const fav = new Favourite(homeId)
    fav.save()
    .then()
    .catch(err => console.log(`Error :: storeController :: postAddToFavourite :: Error :: ${err}`))
    .finally(()=>{
        res.redirect('/favourites')
    })
}

exports.postRemoveFromFavourite = (req,res)=>{
    const homeId = req.params.homeId;
    Favourite.deleteById(homeId)
    .then()
    .catch(err => console.log(`Error :: storeController :: postRemoveFromFavourite :: Error :: ${err}`))
    .finally(()=>{
        res.redirect('/favourites')
    })
}
