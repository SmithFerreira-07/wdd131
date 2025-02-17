const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const goalsList = document.getElementById('goals-list');
const addGoalButton = document.querySelector('.add-goal');
const streakCounter = document.getElementById('streak-counter');

let state = {
    goals: [],
    currentStreak: 0,
    workouts: [],
    weightLog: [],
    lastWorkoutDate: null
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }

    @keyframes fadeOut {
        to {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(styleSheet);


function loadData() {
    const savedState = localStorage.getItem('workoutPalState');
    if (savedState) {
        state = JSON.parse(savedState);
        renderAll();
    }
}

function saveData() {
    localStorage.setItem('workoutPalState', JSON.stringify(state));
}

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function addGoal(goalText) {
    if (goalText.trim()) {
        state.goals.push({
            id: Date.now(),
            text: goalText.trim(),
            completed: false,
            date: Date.now()
        });
        saveData();
        renderGoals();
    }
}

function renderGoals() {
    goalsList.innerHTML = '';
    state.goals.forEach(goal => {
        const goalElement = document.createElement('div');
        goalElement.className = 'goal-item';
        goalElement.innerHTML = `
            <input type="checkbox" ${goal.completed ? 'checked' : ''}>
            <span>${goal.text}</span>
            <button class="delete-goal" title="Delete goal">×</button>
        `;
        if (Date.now() - goal.date < 1000) {
            goalElement.style.aniamtion = 'slideIn 0.3s ease';
        }

        const checkbox = goalElement.querySelector('input');
        checkbox.addEventListener('change', () => {
            goal.completed = checkbox.checked;
            if (goal.completed) {
                goalElement.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    saveData();
                    updateStreak();
                    renderGoals();
                }, 300)
            }
        })
    })
}