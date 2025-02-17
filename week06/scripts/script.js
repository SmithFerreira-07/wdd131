const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const goalsList = document.getElementById('goals-list');
const addGoalButton = document.querySelector('.add-goal');
const clearGoalsButton = document.querySelector('.clear-goals');
const streakCounter = document.getElementById('streak-counter');
const weightChart = document.getElementById('weight-chart');
const currentWorkout = document.getElementById('current-workout');
const goalModal = document.getElementById('goalModal');
const closeModal = document.querySelector('.close-modal');
const saveGoalButton = document.getElementById('saveGoal');
const goalInput = document.getElementById('goalInput');
const workoutInput = document.getElementById('workoutInput');
const logWorkoutButton = document.getElementById('logWorkout');
const weightInput = document.getElementById('weightInput');
const logWeightButton = document.getElementById('logWeight');

let state = {
    goals: [],
    currentStreak: 0,
    workouts: [],
    weightLog: [],
    lastWorkoutDate: null
};

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
    menuToggle.textContent = navLinks.classList.contains('active') ? '×' : '☰';
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
        goalElement.className = `goal-item ${goal.completed ? 'completed' : ''}`;
        goalElement.innerHTML = `
            <div class="single-goal">
                <input type="checkbox" ${goal.completed ? 'checked' : ''}>
                <span>${goal.text}</span>
                <button class="delete-goal" title="Delete goal">×</button>
            </div>
        `;
        if (Date.now() - goal.date < 1000) {
            goalElement.style.animation = 'slideIn 0.3s ease';
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
                }, 300);
            } else {
                saveData();
                updateStreak();
            }
        });

        const deleteButton = goalElement.querySelector('.delete-goal');
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this goal?')) {
                goalElement.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    state.goals = state.goals.filter(g => g.id !== goal.id);
                    saveData();
                    renderGoals();
                }, 300);
            }
        });

        goalsList.appendChild(goalElement);
    });
}

function updateStreak() {
    const today = new Date();
    const lastWorkout = new Date(state.lastWorkoutDate);

    if (lastWorkout.toDateString() === today.toDateString() && state.workouts.length > 0) {
        state.currentStreak++;
    } else if ((today - lastWorkout) / (1000 * 60 * 60 * 24) > 1) {
        state.currentStreak = 0;
    }

    renderStreak();
    saveData();
}

function renderStreak() {
    if (streakCounter) {
        streakCounter.innerHTML = `
            <div class="streak-card">
                <h3>Current Streak</h3>
                <p class="streak-number">${state.currentStreak} days</p>
                <p class="streak-message">${getStreakMessage(state.currentStreak)}</p>
            </div>
        `;
    }
}

function getStreakMessage(streak) {
    if (streak === 0) return "Start your streak today!";
    if (streak < 3) return "Great start! Keep going!";
    if (streak < 7) return "You're building momentum!";
    if (streak < 14) return "You're on fire! 🔥";
    return "Unstoppable! 🏆";
}

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

function init() {
    loadData();

    addGoalButton.addEventListener('click', () => {
        goalModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        goalModal.style.display = 'none';
    });

    saveGoalButton.addEventListener('click', () => {
        if (goalInput.value.trim()) {
            addGoal(goalInput.value.trim());
            goalInput.value = '';
            goalModal.style.display = 'none';
        }
    });

    clearGoalsButton.addEventListener('click', () => {
        state.goals = [];
        saveData();
        renderGoals();
    });

    logWorkoutButton.addEventListener('click', () => {
        const workout = workoutInput.value.trim();
        if (workout) {
            state.workouts.push({
                date: new Date().toISOString(),
                workout: workout
            });
            state.lastWorkoutDate = new Date().toISOString();
            saveData();
            renderWorkouts();
            workoutInput.value = '';
            updateStreak();
        }
    });

    logWeightButton.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value);
        if (!isNaN(weight)) {
            state.weightLog.push({
                date: new Date().toISOString(),
                weight: weight
            });
            saveData();
            renderWeightChart();
            weightInput.value = '';
        }
    });

    const quotes = [
        "Your body can stand almost anything. It's your mind that you have to convince.",
        "The only bad workout is the one that didn't happen.",
        "Success starts with self-discipline.",
        "Your health is an investment, not an expense.",
        "Small progress is still progress.",
        "Make yourself proud.",
        "Discipline over motivation!"
    ];

    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
        setInterval(() => {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteElement.textContent = randomQuote;
        }, 10000);
    }

    renderAll();
}

function renderAll() {
    renderGoals();
    renderStreak();
}

init();