const express = require("express");
const router = express.Router();

const overwatch = require("../data/overwatch");

// ------------------ OW Team Page

// Define a route to display all Overwatch characters
router.get("/", (req, res,) => {
    res.json(overwatch);  // Send the overwatch data as JSON
    console.log("Overwatch Team API");
});

// -- POST
router
.post("/", (req, res) => {

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
router
.route("/:id")
.get((req, res, next) => {
  const overwatchChara = overwatch.find((f) => f.id == req.params.id);
  if(overwatchChara){
    res.json(overwatchChara);
    console.log(`Your specified Overwatch Character is ${overwatchChara.Name}`);
  }
  else {
    next({ status: 404, message: 'Character not found' })
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

  module.exports = router;