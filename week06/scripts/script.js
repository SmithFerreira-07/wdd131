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
const logWeightButton = document.getElementById('logWeight');
const userNameElement = document.getElementById('userName');
const workoutList = document.getElementById('workout-list');
const addWorkoutButton = document.querySelector('.add-workout');
const workoutModal = document.getElementById('workoutModal');
const closeWorkoutModal = workoutModal.querySelector('.close-modal');
const saveWorkoutButton = document.getElementById('saveWorkout');
const exerciseNameInput = document.getElementById('exerciseName');
const repetitionsInput = document.getElementById('repetitions');
const weightInput = document.getElementById('weight');
const clearWorkoutsButton = document.querySelector(".clear-workouts");

const savedUserName = localStorage.getItem('userName');
if (savedUserName) {
    userNameElement.textContent = savedUserName;
}

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
            saveData();
            updateStreak();
            renderGoals();
        });

        const deleteButton = goalElement.querySelector('.delete-goal');
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this goal?')) {
                state.goals = state.goals.filter(g => g.id !== goal.id);
                saveData();
                renderGoals();
            }
        });

        goalsList.appendChild(goalElement);
    });
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastWorkout = state.lastWorkoutDate ? new Date(state.lastWorkoutDate).toDateString() : null;

    if (lastWorkout === today && state.workouts.length > 0) {
        state.currentStreak++;
    } else if ((new Date(today) - new Date(lastWorkout)) / (1000 * 60 * 60 * 24) > 1) {
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
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(20px); }
    }
    @keyframes fadeOut {
        to { opacity: 0.5; }
    }
`;
document.head.appendChild(styleSheet);

function init() {
    loadData();
    addGoalButton.addEventListener('click', () => goalModal.style.display = 'flex');
    closeModal.addEventListener('click', () => goalModal.style.display = 'none');
    addWorkoutButton.addEventListener("click", () => workoutModal.style.display = "block");
    closeWorkoutModal.addEventListener("click", () => workoutModal.style.display = "none");
    saveGoalButton.addEventListener('click', () => {
        if (goalInput.value.trim()) {
            addGoal(goalInput.value.trim());
            goalInput.value = '';
            goalModal.style.display = 'none';
        }
    });
    saveWorkoutButton.addEventListener("click", () => {
        const exercise = exerciseNameInput.value.trim();
        const repetitions = repetitionsInput.value.trim();
        const weight = weightInput.value.trim();

        if (exercise && repetitions) {
            const workoutItem = document.createElement("div");
            workoutItem.classList.add("workout-item");
            workoutItem.innerHTML = `<strong>${exercise}</strong> - ${repetitions} reps ${weight ? `(${weight} kg)` : ""}`;
            workoutList.appendChild(workoutItem);
            exerciseNameInput.value = "";
            repetitionsInput.value = "";
            weightInput.value = "";
            workoutModal.style.display = "none";
        }
    });
    clearWorkoutsButton.addEventListener("click", () => {
        workoutList.innerHTML = "";
    });
    clearGoalsButton.addEventListener('click', () => {
        state.goals = [];
        saveData();
        renderGoals();
    });
    renderAll();
}

function renderAll() {
    renderGoals();
    renderStreak();
}

init();
