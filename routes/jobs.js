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

// DELETE /jobs/:id - Delete a job by ID
router.delete('/:id', (req, res) => {
  const jobId = req.params.id;

  const sql = 'DELETE FROM jobs WHERE id = ?';

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Connection error:', err.message);
      return res.status(500).json({ error: 'Database connection error' });
    }

    connection.query(sql, [jobId], (err, result) => {
      connection.release();

      if (err) {
        console.error('Error deleting job:', err.message);
        return res.status(500).json({ error: 'Database delete failed' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Job not found' });
      }

      res.json({ message: `Job with ID ${jobId} deleted` });
    });
  });
});

// PUT /jobs/:id - Update a job by ID
router.put('/:id', (req, res) => {
  const jobId = req.params.id;
  const { company, title, status, applied_date, notes } = req.body;

  const sql = `
    UPDATE jobs
    SET company = ?, title = ?, status = ?, applied_date = ?, notes = ?
    WHERE id = ?
  `;
  const values = [company, title, status, applied_date, notes, jobId];

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Connection error:', err.message);
      return res.status(500).json({ error: 'Database connection error' });
    }

    connection.query(sql, values, (err, result) => {
      connection.release();

      if (err) {
        console.error('Error updating job:', err.message);
        return res.status(500).json({ error: 'Database update failed' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Job not found' });
      }

      res.json({ message: `Job with ID ${jobId} updated` });
    });
  });
});


module.exports = router;
