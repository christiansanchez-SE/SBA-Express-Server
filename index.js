const express = require('express');
const app = express();
const port = 3000;

const overwatch = require("./data/overwatch");
const talon = require("./data/talon");
const unChara = require("./data/unChara");

// ---- calling middleware function
app.use(logger);

// ------------------ Home Page
app.get('/', (req, res) => {
    console.log('Overwatch Home Page');
    res.send('Overwatch Home Page');
});
////////////////////////////////////////////////////////
// ---- All files
app.get("/api/data", (req, res) => {
    res.json({overwatch, talon, unChara});
});

////////////////////////////////////////////////////////
// ------------------ OW File
// ------------------ OW Team Page

app.get('/overwatch', (req, res) => {
    console.log('Overwatch Team Page');
    res.send('Overwatch Team');
});

// ------------------ OW Team API

app.get("/api/overwatch", (req, res) => {
    console.log('Overwatch Team API');
    res.json(overwatch);
});

// Creating a GET for a specific overwatch character id
app.get("/api/overwatch/:id", (req, res) => {
    const overwatchChara = overwatch.find((f) => f.id == req.params.id);
    if (overwatchChara) {
        res.json(overwatchChara);
        console.log(`Your specified Overwatch Character is ${overwatchChara.Name}`);
    } else {
        res.status(404).send('Character not found');
        console.log('Character not found in Overwatch');
    }
});


////////////////////////////////////////////////////////
// ------------------ Talon File
app.get('/talon', (req, res) => {
    console.log('Talon Team Page');
    res.send('Talon Team');
});

// ------------------ Talon API
app.get('/api/talon', (req, res) => {
    console.log('Talon Team API');
    res.json(talon);
});

// Creating a GET for a specific True Unaligned(unChara) character id
app.get('/api/talon/:id', (req, res) => {
    const talonChara = talon.find((u) => u.id == req.params.id);
    if (talonChara) {
        res.json(talonChara);
        console.log(`Your specified Talon Character is ${talonChara.Name}`);
    } else {
        res.status(404).send('Character not found');
        console.log('Character not found');
    }
});

////////////////////////////////////////////////////////
// ------------------ True Unaligned(unChara) File
app.get('/unChara', (req, res) => {
    console.log('True Unaligned Characters Page');
    res.send('True Unaligned Characters');
});

// ------------------ True Unaligned(unChara) API
app.get('/api/unChara', (req, res) => {
    console.log('True Unaligned Characters API');
    res.json(unChara);
});

// Creating a GET for a specific True Unaligned(unChara) character id
app.get('/api/unChara/:id', (req, res) => {
    const unCharacter = unChara.find((f) => f.id == req.params.id);
    if (unCharacter) {
        res.json(unCharacter);
        console.log(`Your specified Unaligned Character is ${unCharacter.Name}`);
    } else {
        res.status(404).send('Character not found');
        console.log('Character not found');
    }
});

////////////////////////////////////////////////////////
// ---------- Middleware
function logger(req, res, next){
    console.log('Log');
    next()
}

app.listen(port, (req, res) => {
    console.log(`Server started on port: ${port}`);
});