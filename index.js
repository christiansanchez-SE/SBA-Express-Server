const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const overwatch = require("./data/overwatch");
const talon = require("./data/talon");
const unChara = require("./data/unChara");

// // Adding route imports, not database imports
// const overwatch = require("./routes/overwatch");
// const talon = require("./routes/talon");
// const unChara = require("./routes/unChara");

// Adding React
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine())


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

app
.route("/api/overwatch")
.get((req, res) => {
    res.json(overwatch);
    console.log("Overwatch Team API");
;})
// -- POST
app.post("/api/overwatch", (req, res) => {

    const { Name, Description, Role, Location } = req.body;
    if (Name && Description && Role && Location) {
      // Check if the hero name already exists
      if (overwatch.find((f) => f.Name === Name)) {
        return res.status(409).json({ error: "Name Already Taken" }); 
      }

      // Create a new hero object
      const hero = {
        id: overwatch[overwatch.length - 1].id + 1, // This will generate an id for the new hero
        Name,
        Description,
        Role,
        Location
      };

      overwatch.push(hero); // Adding the new hero to the array
      res.status(201).json(hero); // 201 throws a status as "Created" and (json)hero sends the "hero" object as a JSON string
    } else {
      res.status(400).json({ error: "Insufficient Data" }); // 400 Bad Request for missing data
    }
  });


// Creating a GET for a specific overwatch character id
app
.route("/api/overwatch/:id")
.get((req, res, next) => {
  const overwatchChara = overwatch.find((f) => f.id == req.params.id);
  if (!overwatchChara) {
    return next({ status: 404, message: 'Character not found' });
  } 
  else {
    res.json(overwatchChara);
    console.log(`Your specified Overwatch Character is ${overwatchChara.Name}`);
  }
})
.patch((req, res, next) => {
    // Within the PATCH request route, we allow the client to make changes to an existing user in the database.
    const hero = overwatch.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
            overwatch[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (hero) res.json(hero);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const hero = overwatch.find((u, i) => {
      if (u.id == req.params.id) {
        overwatch.splice(i, 1);
        return true;
      }
    });

    if (hero) res.json(hero);
    else next();
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
    return next({ status: 404, message: "Talon character not found" });
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
      return next({ status: 404, message: "Unaligned character not found" });
    } else {
      res.json(unCharacter);
      console.log(`Your specified Unaligned Character is ${unCharacter.Name}`);
    }
  });


// Error Handling
  app.use((err, req, res, next) => {
    console.error(err); // Log the error information for debugging
    res.status(err.status).send({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  });

////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
