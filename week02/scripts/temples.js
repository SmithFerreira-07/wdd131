const year = new Date().getFullYear();
document.getElementById("currentyear").textContent = year;
const lastModification = document.lastModified;
document.getElementById("modification").textContent = lastModification;


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const xButton = document.getElementById('x-button');



hamburger.addEventListener('click', () => {
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    
    
  }
});