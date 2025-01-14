const DAYS = 6;
const LIMIT = 30;
let studentReport = [11, 42, 33, 64, 29, 37, 44];
let dayNames = ["Monday", "Tuesday", "Wednesday","Thursday","Friday", "Saturday", "Sunday"]
//foreach
function printToConsole(grade) {
    if (grade < 30) {
        console.log(grade)
    }
}

studentReport.forEach(printToConsole)

// for
for (let i = 0; i < studentReport.length; i++) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i])
    }
}

// for in

for (let i in studentReport) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i]);
    }
}

//while
let i =0;
while (i < studentReport.length) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i]);
    }
    i++;
}

//dayNames function

function printDay(day) {
    console.log(day)
}

dayNames.forEach(printDay)
