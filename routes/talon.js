const express = require("express");
const router = express.Router();

const talon = require("../data/talon");

// ------------------ Talon File
// app.get("/talon", (req, res) => {
//     res.send("Talon Team");
//     console.log("Talon Team Page");
// });

// // ------------------ Talon API
// app.get("/api/talon", (req, res) => {
//     res.json(talon);
//     console.log("Talon Team API");
// });

// // Creating a GET for a specific Talon character id
// app.get("/api/talon/:id", (req, res, next) => {
//   const talonChara = talon.find((f) => f.id == req.params.id);
//   if (!talonChara) {
//     return next({ status: 404, message: "Talon character not found" });
//   } else {
//     res.json(talonChara);
//     console.log(`Your specified Talon Character is ${talonChara.Name}`);
//   }
// });

module.exports = router;
