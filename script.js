const baseUrl = 'http://localhost:3000'; 

document.addEventListener('DOMContentLoaded', function() {
  // Hide content initially
  document.getElementById('content').style.display = 'none';

  // Password Logic
  document.getElementById('enter-button').addEventListener('click', function() {
    const password = document.getElementById('password-input').value;
    if (password === '2010') {
      document.getElementById('password-container').style.display = 'none';
      document.getElementById('content').style.display = 'block';
      loadComments(); 
    } else {
      alert('Incorrect Password!');
    }
  });

  // Date & Message Logic
  document.getElementById('view-message-button').addEventListener('click', function() {
    const selectedDate = document.getElementById('date-picker').value;

    fetch(`${baseUrl}/message/${selectedDate}`) 
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
    fetch(`${baseUrl}/comments`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment: commentText })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Comment added:", data);
      loadComments(); 
    })
    .catch(error => {
      console.error("Error posting comment:", error);
      alert("Error posting comment.");
    });
  });

  // Load comments initially
  loadComments();

  function loadComments() {
    fetch(`${baseUrl}/comments`) 
      .then(response => response.json())
      .then(data => {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';
        data.forEach(comment => {
          const commentElement = document.createElement('p');
          commentElement.textContent = comment;
          commentsContainer.appendChild(commentElement);
        });
      })
      .catch(error => {
        console.error("Error loading comments:", error);
        alert("Error loading comments.");
      });
  }
});