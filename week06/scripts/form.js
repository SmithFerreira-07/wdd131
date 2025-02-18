const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const userName = document.getElementById('name').value.trim();
    if (userName) {
        localStorage.setItem('userName', userName);
        window.location.href = 'index.html';
    }
});

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.textContent = navLinks.classList.contains('active') ? '×' : '☰';
    });
}
