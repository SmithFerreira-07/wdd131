const year = new Date().getFullYear();
document.getElementById("currentyear").textContent = year;
const lastModification = document.lastModified;
document.getElementById("modification").textContent = lastModification;


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');





hamburger.addEventListener('click', () => {
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";

  } else {
    navLinks.style.display = "flex";

  }
});


const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, USA",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, USA",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, MD, USA",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Sacramento California Temple",
    location: "Sacramento, CA, USA",
    dedicated: "2006, September, 3",
    area: 19500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/sacramento-california-temple/sacramento-california-temple-8098-main.jpg"
  },
  {
    templeName: "Nauvoo Illinois Temple",
    location: "Nauvoo, Illinois",
    dedicated: "1999, October, 24",
    area: 54000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/nauvoo-illinois-temple/nauvoo-illinois-temple-50576-main.jpg"
  },
  {
    templeName: "São Paulo Brazil Temple",
    location: "São Paulo, São Paulo",
    dedicated: "1976, March, 20",
    area: 59246,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg"
  }
];


const album = document.querySelector(".album");

function displayTemples(temples) {
  album.innerHTML = "";

  temples.forEach((temple) => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
            <div class="image-cards">
            <figcaption>${temple.templeName}<p><strong>Location: </strong>${temple.location}<br><strong>Dedicated: </strong>${temple.dedicated}<br><strong>Size: ${temple.area} sqr ft</strong></p></figcaption>
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            </div>
        `;
    album.appendChild(figure);
  });
}

displayTemples(temples);

document.querySelector(".nav-links").addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    const filter = event.target.textContent.trim();
    let filteredTemples = [];

    if (filter === "Old") {
      filteredTemples = temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900);
    } else if (filter === "New") {
      filteredTemples = temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000);
    } else if (filter === "Large") {
      filteredTemples = temples.filter(t => t.area > 90000);
    } else if (filter === "Small") {
      filteredTemples = temples.filter(t => t.area < 90000);
    } else {
      filteredTemples = temples;
    }

    displayTemples(filteredTemples);
  }
});