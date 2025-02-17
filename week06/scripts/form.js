document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const userName = document.getElementById('name').value.trim();
    if (userName) {
        localStorage.setItem('userName', userName);
        window.location.href = 'index.html';
    }
});