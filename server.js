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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
