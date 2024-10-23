document.getElementById('enter-button').addEventListener('click', function() {
    const password = document.getElementById('password-input').value;
    if (password === '2010') {
        document.getElementById('password-container').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        alert('Incorrect Password!'); 
    }
}); document.getElementById('view-message-button').addEventListener('click', function() {
    const selectedDate = document.getElementById('date-picker').value;
    if (selectedDate === '2024-10-22') {
        document.getElementById('message-container').style.display = 'block';
        document.getElementById('stored-message').textContent = 'This is your stored message!';
    } else {
        alert('No message for this date.'); 
    }
}); 

document.getElementById('post-comment-button').addEventListener('click', function() {
    const commentText = document.getElementById('comment-input').value;
    const commentList = document.getElementById('comment-list');
    const newComment = document.createElement('li');
    newComment.textContent = commentText;
    commentList.appendChild(newComment);
    document.getElementById('comment-input').value = '';
}); 