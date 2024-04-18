const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.listen(port, (req, res) => {
    console.log(`Listening on port: ${port}`);
});