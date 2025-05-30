const express = require('express');
const app = express();
const db = require('./db'); // connects to MySQL

const jobRoutes = require('./routes/jobs');

app.use(express.json());

// Mount the /jobs route
app.use('/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

module.exports = app;