const express = require("express");
const router = express.Router();

const talon = require("../data/talon");

// ------------------ Talon Team Page 

router.get("/", (req, res,) => {
    res.json(talon);  // Send the talon data as JSON
    console.log("Talon Team API");
});

// -- POST
router
.post("/", (req, res) => {

    const { Name, Description, Role, Location } = req.body;
    if (Name && Description && Role && Location) {
      // Check if the villain name already exists
      if (talon.find((f) => f.Name === Name)) {
        return res.status(409).json({ error: "Name Already Taken" }); 
      }

      // Create a new villain object
      const villain = {
        id: talon[talon.length - 1].id + 1, // This will generate an id for the new villain
        Name,
        Description,
        Role,
        Location
      };

      talon.push(villain); // Adding the new hero to the array
      res.status(201).json(villain); // 201 throws a status as "Created" and json(villain) sends the "villain" object as a JSON string
    } else {
      res.status(400).json({ error: "Insufficient Data" }); // 400 Bad Request for missing data
    }
  });

// Creating a GET for a specific overwatch character id
router
.route("/:id")
.get((req, res, next) => {
  const talonChara = talon.find((f) => f.id == req.params.id);
  if (talonChara) {
    res.json(talonChara);
    console.log(`Your specified Overwatch Character is ${talonChara.Name}`);
  } 
  else {
    next({ status: 404, message: 'Character not found' });
  }
})
.patch((req, res, next) => {
    // Within the PATCH request route, we allow the client to make changes to an existing user in the database.
    const villain = talon.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
            talon[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (villain) res.json(villain);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const villain = talon.find((u, i) => {
      if (u.id == req.params.id) {
        talon.splice(i, 1);
        return true;
      }
    });

    if (villain) res.json(villain);
    else next();
  });
  
module.exports = router;
