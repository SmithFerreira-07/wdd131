const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.textContent = navLinks.classList.contains('active') ? '×' : '☰';
    });
}


document.getElementById('calculate-button').addEventListener('click', calculateCalories);

function calculateCalories() {
    const weight = parseFloat(document.getElementById('weight').value);
    const exerciseType = document.getElementById('exercise').value;
    const duration = parseFloat(document.getElementById('duration').value);
    let caloriesBurned = 0;

    if (isNaN(weight) || isNaN(duration) || weight <= 0 || duration <= 0) {
        alert("Please enter valid values for weight and duration.");
        return;
    }
    switch (exerciseType) {
        case 'running':
            caloriesBurned = (weight * 0.09) * duration; 
            break;
        case 'cycling':
            caloriesBurned = (weight * 0.05) * duration; 
            break;
        case 'jumping':
            caloriesBurned = (weight * 0.12) * duration; 
            break;
        case 'swimming':
            caloriesBurned = (weight * 0.07) * duration; 
            break;
        default:
            caloriesBurned = 0;
            break;
    }
    document.getElementById('calories').textContent = caloriesBurned.toFixed(2);
}
