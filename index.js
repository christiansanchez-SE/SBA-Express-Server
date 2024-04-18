const express = require('express');
const app = express();
const port = 3000;

app.use(logger)

// ------------------ Home Page
app.get('/', (req, res) => {
    console.log('Overwatch Home Page')
    res.send('Overwatch Home Page')
})

// ------------------ OW File
app.get('/overwatch', (req, res) => {
    console.log('Overwatch Team Page')
    res.send('Overwatch Team')
})


// ------------------ Talon File
app.get('/fighting', (req, res) => {
    console.log('Talon Team Page')
    res.send('Talon Team')
})


// ------------------ True Unaligned(tu) File
app.get('/rpg', (req, res) => {
    console.log('True Unaligned Characters Page')
    res.send('True Unaligned Characters')
})

// ---------- Middleware
function logger(req, res, next){
    console.log('Log')
    next()
}

app.listen(port, (req, res) => {
    console.log(`Listening on port: ${port}`);
});