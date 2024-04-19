const express = require("express");
const app = express();
const port = 3000;

//Routes
const overwatchRoutes = require("./routes/overwatch");
const talonRoutes = require("./routes/talon");
const unCharaRoutes = require("./routes/unChara");

//Data
const overwatchData = require("./data/overwatch");
const talonData = require("./data/talon");
const unCharaData = require("./data/unChara");

const bodyParser = require("body-parser");

// Adding React
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

// Parsing Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Importing overwatchRoutes
app.use("/api/overwatch", overwatchRoutes);
app.use("/api/talon", talonRoutes);
app.use("/api/unChara", unCharaRoutes);

// ------------------ Home Page
app.get("/", (req, res) => {
  res.send("Overwatch Home Page");
  console.log("Overwatch Home Page");
});

// ---- All files
app.get("/api/overwatchRoster", (req, res) => {
  res.json({
    overwatch: overwatchData,
    talon: talonData,
    unChara: unCharaData
  });
  console.log("All Overwatch Characters Page");
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
