const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /jobs - Fetch all jobs
router.get('/', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Connection error:', err.message);
      return res.status(500).json({ error: 'Database connection error' });
    }

    connection.query('SELECT * FROM jobs', (err, results) => {
      connection.release();

      if (err) {
        console.error('Error fetching jobs:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });
});

// POST /jobs - Add a new job application
router.post('/', (req, res) => {
  const { company, title, status, applied_date, notes } = req.body;
  const sql = `
    INSERT INTO jobs (company, title, status, applied_date, notes)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [company, title, status, applied_date, notes];

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Connection error:', err.message);
      return res.status(500).json({ error: 'Database connection error' });
    }

    connection.query(sql, values, (err, result) => {
      connection.release();

      if (err) {
        console.error('Error adding job:', err.message);
        return res.status(500).json({ error: 'Database insert failed' });
      }

      res.status(201).json({ message: 'Job added successfully', id: result.insertId });
    });
  });
});

module.exports = router;
