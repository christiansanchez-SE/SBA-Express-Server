const express = require('express');
const app = express();
const port = 3000;

const overwatch = require("./data/overwatch");
const talon = require("./data/talon");
const unChara = require("./data/unChara");

// ---- calling middleware function
app.use(logger)

// ------------------ Home Page
app.get('/', (req, res) => {
    console.log('Overwatch Home Page')
    res.send('Overwatch Home Page')
})

// ------------------ OW File
// ------------------ OW Team Page

app.get('/overwatch', (req, res) => {
    console.log('Overwatch Team Page')
    res.send('Overwatch Team')
})

// ------------------ OW Team API

app.get("/api/overwatch", (req, res) => {
    res.json(overwatch);
})

// ------------------ Talon File
app.get('/talon', (req, res) => {
    console.log('Talon Team Page')
    res.send('Talon Team')
})

// ------------------ Talon API
app.get('/api/talon', (req, res) => {
    res.json(talon);
})

// ------------------ True Unaligned(unChara) File
app.get('/rpg', (req, res) => {
    console.log('True Unaligned Characters Page')
    res.send('True Unaligned Characters')
})

// ------------------ True Unaligned(unChara) API
app.get('/api/unChara', (req, res) => {
    res.json(unChara);
})

// ---------- Middleware
function logger(req, res, next){
    console.log('Log')
    next()
}

app.listen(port, (req, res) => {
    console.log(`Listening on port: ${port}`);
});