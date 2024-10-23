const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json()); // For parsing JSON data

// --- Comment Functionality ---

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

// --- Other Routes (You'll likely expand these) --- 
app.get('/message/:date', (req, res) => { 
  const date = req.params.date;
  // Add your logic to retrieve messages based on date (e.g., from a database or file)
  // For now, we'll just send a placeholder response
  res.send({ message: `Message for ${date} (from the server)` }); 
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
