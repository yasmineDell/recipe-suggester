// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const recipesRouter = require('./routes/recipes'); // Import the routes

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Use the recipes route
app.use('/api', recipesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
