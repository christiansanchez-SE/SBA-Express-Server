const express = require("express");
const router = express.Router();

const unChara = require("../data/unChara");

// // ------------------ True Unaligned(unChara) File
// app.get("/unChara", (req, res) => {
//     res.send("True Unaligned Characters");
//     console.log("True Unaligned Characters Page");
// });

// // ------------------ True Unaligned(unChara) API
// app.get("/api/unChara", (req, res) => {
//     res.json(unChara);
//     console.log("True Unaligned Characters API");
// });

// // Creating a GET for a specific Unaligned character id
// app.get("/api/unChara/:id", (req, res, next) => {
//     const unCharacter = unChara.find((f) => f.id == req.params.id);
//     if (!unCharacter) {
//       return next({ status: 404, message: "Unaligned character not found" });
//     } else {
//       res.json(unCharacter);
//       console.log(`Your specified Unaligned Character is ${unCharacter.Name}`);
//     }
//   });

module.exports = router;
