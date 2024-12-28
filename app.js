const express = require('express')
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const app = express();

const errorsDisplay = require('./controllers/errors');
const { mongoConnect } = require('./utils/databaseUtil');

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.urlencoded({ extended: true }));
app.use(storeRouter)
app.use('/host', hostRouter);

app.use(errorsDisplay.pageNotFound)

const PORT = 3000;

mongoConnect( () => {
    app.listen(PORT, ()=>{
        console.log(`running at http://localhost:${3000}`)
    })
})
