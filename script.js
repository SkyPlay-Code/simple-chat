document.addEventListener('DOMContentLoaded', function() {
    // Hide the content initially
    document.getElementById('content').style.display = 'none';
  
    // Password Logic
    document.getElementById('enter-button').addEventListener('click', function() {
      const password = document.getElementById('password-input').value;
      if (password === '2010') {
        document.getElementById('password-container').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        loadComments(); // Load comments when the user logs in
      } else {
        alert('Incorrect Password!');
      }
    });
  
    // Date & Message Logic
    document.getElementById('view-message-button').addEventListener('click', function() {
      const selectedDate = document.getElementById('date-picker').value;
  
      // For now, we're just displaying a placeholder message. 
      // You'll replace this with your actual message retrieval logic.
      fetch(`/message/${selectedDate}`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('message-container').style.display = 'block';
          document.getElementById('stored-message').textContent = data.message; 
        })
        .catch(error => {
          console.error("Error fetching message:", error);
          alert("Error fetching message for this date.");
        });
    });
  
    // --- Comments Logic ---
    document.getElementById('post-comment-button').addEventListener('click', function() {
      const commentText = document.getElementById('comment-input').value;
  
      fetch('/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment: commentText })
      })
      .then(response => response.json())
      .then(data => {
   console.log(data);
        loadComments(); // Reload comments after posting
      })
      .catch(error => console.error('Error posting comment:', error));
    });
  });
  
  function loadComments() {
    fetch('/comments')
      .then(response => response.json())
      .then(comments => {
        const commentList = document.getElementById('comment-list');
        commentList.innerHTML = ''; // Clear the list
  
        comments.forEach(comment => {
          const commentElement = document.createElement('li');
          commentElement.textContent = comment;
          commentList.appendChild(commentElement);
        });
      })
      .catch(error => console.error('Error loading comments:', error));
  }