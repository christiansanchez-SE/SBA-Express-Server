const express = require("express");
const router = express.Router();

const unChara = require("../data/unChara");

// ------------------ True Unaligned(unChara) Page

// // ------------------ True Unaligned(unChara) File
router.get("/", (req, res,) => {
    res.json(unChara);  // Send the trueUA data as JSON
    console.log("Unaligned Team API");
});

// -- POST
router
.post("/", (req, res) => {

    const { Name, Description, Role, Location } = req.body;
    if (Name && Description && Role && Location) {
      // Check if the hero name already exists
      if (unChara.find((f) => f.Name === Name)) {
        return res.status(409).json({ error: "Name Already Taken" }); 
      }

      // Create a new hero object
      const trueUA = {
        id: unChara[unChara.length - 1].id + 1, // This will generate an id for the new trueUA
        Name,
        Description,
        Role,
        Location
      };

      unChara.push(trueUA); // Adding the new trueUA to the array
      res.status(201).json(trueUA); // 201 throws a status as "Created" and json(trueUA) sends the "trueUA" object as a JSON string
    } else {
      res.status(400).json({ error: "Insufficient Data" }); // 400 Bad Request for missing data
    }
  });

  // Creating a GET for a specific trueUA character id
router
.route("/:id")
.get((req, res, next) => {
  const unCharacter = unChara.find((f) => f.id == req.params.id);
  if (unCharacter) {
    res.json(unCharacter);
    console.log(`Your specified Overwatch Character is ${unCharacter.Name}`);
  } 
  else {
     next({ status: 404, message: 'Character not found' });
  }
})
.patch((req, res, next) => {
    // Within the PATCH request route, we allow the client to make changes to an existing user in the database.
    const unCharacter = unChara.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
            unChara[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (unCharacter) res.json(unCharacter);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const unCharacter = unChara.find((u, i) => {
      if (u.id == req.params.id) {
        unChara.splice(i, 1);
        return true;
      }
    });

    if (unCharacter) res.json(unCharacter);
    else next();
  });

module.exports = router;
