const express = require('express');
const fs = require('fs');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json()); // For parsing JSON data

// --- MySQL Database Connection ---
const connection = mysql.createConnection({
  host: 'localhost', // Or your MySQL host
  user: 'root', // Your MySQL username
  password: 'Test@SQL#1database', // Your MySQL password
  database: 'simple_chat'
});

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
  }
  console.log('Connected to MySQL!');
});

// --- Comments Functionality ---

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf-8', (err, data) => {
    if (err) {
      console.error("Failed to read comments:", err);
      res.status(500).send("Error loading comments");
      return;
    }
    res.send(data); 
  });
});

app.post('/comments', (req, res) => {
  const newComment = req.body.comment;
  if (!newComment) {
    return res.status(400).send("Comment is required");
  }

  fs.readFile('comments.json', 'utf-8', (err, data) => {
    if (err) {
      console.error("Failed to read comments:", err);
      return res.status(500).send("Error saving comment");
    }

    let comments = JSON.parse(data);
    comments.push(newComment);

    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        console.error("Failed to write comments:", err);
        return res.status(500).send("Error saving comment");
      }

      res.send({ message: "Comment added successfully" });
    });
  });
});

// ---  Message Functionality --- 
app.get('/message/:date', (req, res) => {
  const requestedDate = req.params.date;

  const sql = `SELECT message_text FROM messages WHERE message_date = ?`;
  connection.query(sql, [requestedDate], (error, results, fields) => {
      if (error) {
          console.error("Error fetching message from database:", error);
          return res.status(500).send('Error fetching message.');
      }
      if (results.length > 0) {
          res.json({ message: results[0].message_text });
      } else {
          res.json({ message: 'No message found for this date.' });
      }
  });
});


// --- Start Server ---
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});