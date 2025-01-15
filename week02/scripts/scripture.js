const input = document.querySelector("#favchap")
const button = document.querySelector("button");
const list = document.querySelector("#list");
//const row = document.createElement("li");
//const deleteButton = document.createElement('button');

//row.textContent = input.value;
//deleteButton.textContext = "❌";
//row.append(deleteButton);
//list.append(row);

button.addEventListener('click', function () {
    if (input.value.trim() == '') {
        input.focus();
    }
    else {
        const row = document.createElement("li");
        row.textContent = input.value;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "❌";
        row.append(deleteButton);
        list.append(row);
        deleteButton.addEventListener('click', function () {
            list.removeChild(row);
            input.focus();
          });
    }

})

