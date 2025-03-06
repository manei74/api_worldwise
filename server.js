const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS so the frontend can fetch data
app.use(cors());

// Route to serve cities.json
app.get("/cities", (req, res) => {
  fs.readFile("cities.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to load data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.get("/cities/:id", (req, res) => {
  const cityId = req.params.id;
  const city = cities[cityId]; // Assuming cities is an object keyed by IDs
  if (city) {
    res.json(city);
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
