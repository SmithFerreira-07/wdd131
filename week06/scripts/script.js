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
const weightSave = document.getElementById('weightSave');
const clearWorkoutsButton = document.querySelector(".clear-workouts");
const clearWeightButton = document.getElementById("clearWeight");

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

function renderWorkouts() {
    workoutList.innerHTML = '';
    state.workouts.forEach(workout => {
        const workoutItemElement = document.createElement("div");
        workoutItemElement.classList.add("workout-item");
        workoutItemElement.innerHTML = `<strong>${workout.exercise}</strong> - ${workout.repetitions} reps ${workout.weight ? `(${workout.weight} kg)` : ""}`;
        if (Date.now() - workout.date < 1000) {
            workoutItemElement.style.animation = 'slideIn 0.3s ease';
        }
        workoutList.appendChild(workoutItemElement);

    });
}

function renderWeightLog() {
    weightChart.innerHTML = "";

    state.weightLog.forEach(weight => {
        const weightItemElement = document.createElement("div");
        weightItemElement.classList.add("weight-item");
        weightItemElement.innerHTML = `<p>${new Date(weight.date).toLocaleDateString()}: ${weight.value} kg</p>`;
        weightChart.appendChild(weightItemElement);
    });
}


function updateStreak() {
    const today = new Date().toDateString();
    const lastWorkout = state.lastWorkoutDate ? new Date(state.lastWorkoutDate).toDateString() : null;
    if (lastWorkout === today && state.workouts.length > 0) {
        state.currentStreak++;
    } else if (lastWorkout && (new Date(today) - new Date(lastWorkout)) / (1000 * 60 * 60 * 24) > 1) {
        state.currentStreak = 0;
    } else if (!lastWorkout) {
        state.currentStreak = 0;
    }
    if (state.workouts.length > 0) {
        state.lastWorkoutDate = state.workouts[state.workouts.length - 1].date;
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
    if (streak > 20) return "Unstoppable! 🏆";
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
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
    addWorkoutButton.addEventListener("click", () => workoutModal.style.display = "flex");
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
            const workoutItem = {
                id: Date.now(),
                exercise: exercise,
                repetitions: repetitions,
                weight: weight || null,
                date: Date.now()
            };
            state.workouts.push(workoutItem);
            saveData();
            renderWorkouts();
            exerciseNameInput.value = "";
            repetitionsInput.value = "";
            weightInput.value = "";
            workoutModal.style.display = "none";
        }

    });
    logWeightButton.addEventListener("click", () => {
        const weightValue = weightSave.value.trim();
        if (weightValue) {
            const weightEntry = {
                id: Date.now(),
                value: weightValue,
                date: Date.now()
            };
            state.weightLog.push(weightEntry);
            saveData();
            renderWeightLog();
            weightSave.value = '';
        }
    });
    clearWorkoutsButton.addEventListener("click", () => {
        state.workouts = [];
        saveData();
        renderWorkouts();
    });
    clearGoalsButton.addEventListener('click', () => {
        state.goals = [];
        saveData();
        renderGoals();
    });
    clearWeightButton.addEventListener("click", () => {
        state.weightLog = [];
        saveData();
        renderWeightLog();
    });

    const quotes = [
        "Your body can stand almost anything. It's your mind that you have to convince.",
        "The only bad workout is the one that didn't happen.",
        "Success starts with self-discipline.",
        "Your health is an investment, not an expense.",
        "Small progress is still progress.",
        "Make yourself proud.",
        "Discipline over motivation!",
        "The gym is not just a place where you lift weights—it's a sanctuary where you build strength, resilience, and character. Every drop of sweat is a testament to your commitment, every rep is a step closer to a better version of yourself. You are not just sculpting your body; you are forging a mindset that will carry you through every challenge in life. Remember, the only limits that exist are the ones you place on yourself. Keep pushing, keep growing, and watch how your hard work transforms not only your body but your entire world."
    ];

    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
        setInterval(() => {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteElement.textContent = randomQuote;
        }, 300000);
    }

    renderAll();
}

function renderAll() {
    renderGoals();
    renderStreak();
    renderWorkouts();
    renderWeightLog();
}

init();
