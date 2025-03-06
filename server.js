const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS so the frontend can fetch data
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Read data from the cities.json file
let cities = [];
fs.readFile("cities.json", "utf8", (err, data) => {
  if (err) {
    console.error("Failed to load data");
  } else {
    cities = JSON.parse(data).cities;
  }
});

// Route to serve all cities
app.get("/cities", (req, res) => {
  res.json({ cities: cities });
});

// Route to serve a single city by ID
app.get("/cities/:id", (req, res) => {
  const cityId = req.params.id;
  const city = cities.find((city) => city.id === cityId);
  if (city) {
    res.json(city);
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

// Route to create a new city
app.post("/cities", (req, res) => {
  const newCity = req.body;
  newCity.id = new Date().toISOString(); // Generate a new ID for the city
  cities.push(newCity);

  // Save the updated cities array to the file
  fs.writeFile("cities.json", JSON.stringify({ cities }), "utf8", (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to save new city" });
    } else {
      res.status(201).json(newCity);
    }
  });
});

// Route to delete a city
app.delete("/cities/:id", (req, res) => {
  const cityId = req.params.id;
  const cityIndex = cities.findIndex((city) => city.id === cityId);

  if (cityIndex === -1) {
    return res.status(404).json({ error: "City not found" });
  }

  // Remove the city from the array
  const deletedCity = cities.splice(cityIndex, 1);

  // Save the updated cities array to the file
  fs.writeFile("cities.json", JSON.stringify({ cities }), "utf8", (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete city" });
    } else {
      res.status(200).json(deletedCity[0]);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
