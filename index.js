const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const overwatch = require("./data/overwatch");
const talon = require("./data/talon");
const unChara = require("./data/unChara");

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging Middlewaare
app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-------
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });


// ------------------ Home Page
app.get("/", (req, res) => {
    res.send("Overwatch Home Page");
    console.log("Overwatch Home Page");
});

////////////////////////////////////////////////////////
// ---- All files
app.get("/api/data", (req, res) => {
    res.json({ overwatch, talon, unChara });
    console.log("All Overwatch Characters Page");
});

////////////////////////////////////////////////////////
// ------------------ OW File
// ------------------ OW Team Page

app.get("/overwatch", (req, res) => {
    res.send("Overwatch Team");
    console.log("Overwatch Team Page");
});

// ------------------ OW Team API

app.get("/api/overwatch", (req, res) => {
    res.json(overwatch);
    console.log("Overwatch Team API");
});

// Creating a GET for a specific overwatch character id
app.get("/api/overwatch/:id", (req, res, next) => {
  const overwatchChara = overwatch.find((f) => f.id == req.params.id);
  if (!overwatchChara) {
    console.log(`status: 404, message: "Overwatch character not found"`);
    return next({ status: 404, message: 'Character not found' });
  } 
  else {
    res.json(overwatchChara);
    console.log(`Your specified Overwatch Character is ${overwatchChara.Name}`);
  }
});

////////////////////////////////////////////////////////
// ------------------ Talon File
app.get("/talon", (req, res) => {
    res.send("Talon Team");
    console.log("Talon Team Page");
});

// ------------------ Talon API
app.get("/api/talon", (req, res) => {
    res.json(talon);
    console.log("Talon Team API");
});

// Creating a GET for a specific Talon character id
app.get("/api/talon/:id", (req, res, next) => {
  const talonChara = talon.find((f) => f.id == req.params.id);
  if (!talonChara) {
    next({ status: 404, message: "Talon character not found" });
  } else {
    res.json(talonChara);
    console.log(`Your specified Talon Character is ${talonChara.Name}`);
  }
});

////////////////////////////////////////////////////////
// ------------------ True Unaligned(unChara) File
app.get("/unChara", (req, res) => {
    res.send("True Unaligned Characters");
    console.log("True Unaligned Characters Page");
});

// ------------------ True Unaligned(unChara) API
app.get("/api/unChara", (req, res) => {
    res.json(unChara);
    console.log("True Unaligned Characters API");
});

// Creating a GET for a specific Unaligned character id
app.get("/api/unChara/:id", (req, res, next) => {
    const unCharacter = unChara.find((f) => f.id == req.params.id);
    if (!unCharacter) {
      next({ status: 404, message: "Unaligned character not found" });
    } else {
      res.json(unCharacter);
      console.log(`Your specified Unaligned Character is ${unCharacter.Name}`);
    }
  });


// Error Handling
  app.use((err, req, res, next) => {
    console.error(err); // Log the error information for debugging
    res.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: err.message || "Internal Server Error",
      },
    });
  });

////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
