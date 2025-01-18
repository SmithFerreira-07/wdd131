myInfo = {
    name: "Brother T",
    photo: "images/photo.jpg",
    favoriteFoods: ["Fettucini", "Steak", "Chicken", "Shrimp", "Baked Potato"],
    hobbies: ["Reading", "Fishing", "Camping"],
    placesLived: [
      {
        place: "Rexburg, ID",
        length: "5 years",
      },
      {
        place: "Ammon, ID",
        length: "3 years",
      },
      {
        place: "Sandy, UT",
        length: "1 year",
      },
    ],
  };

const foodsUl = document.querySelector("#favorite-foods");
function addItem(food) {
    let favoriteFood = document.createElement('li');
    favoriteFood.textContent = food;
    foodsUl.appendChild(favoriteFood);
}
myInfo.favoriteFoods.forEach(addItem);