function checkPassword() {
    const passwordInput = document.getElementById('password').value;
    if (passwordInput === '2010') {
        document.getElementById('welcome').classList.add('hidden');
        document.getElementById('password-container').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
    } else {
        alert('Incorrect password!');
    }
}

function showMessage() {
    const dateInput = document.getElementById('date-input').value;
    const messageDiv = document.getElementById('message');
    if (dateInput) {
        messageDiv.innerText = `You selected ${dateInput}. Here is the information I left for you.`;
    } else {
        messageDiv.innerText = 'Please select a date.';
    }
}

function addComment() {
    const commentInput = document.getElementById('comment-input').value;
    const commentSection = document.getElementById('comment-section');
    if (commentInput) {
        const newComment = document.createElement('p');
        newComment.innerText = commentInput;
        commentSection.appendChild(newComment);
        document.getElementById('comment-input').value = ''; // Clear input
    } else {
        alert('Please enter a comment.');
    }
}