const year = new Date().getFullYear();
document.getElementById("currentyear").textContent = year;
const lastModification = document.lastModified;
document.getElementById("modification").textContent = lastModification;

const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];

  function updateReviewCounter() {
    let count = parseInt(localStorage.getItem('reviewCount')) || 0;
    count++;
    localStorage.setItem('reviewCount', count);
    document.getElementById('reviewCount').textContent = count;
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, letter => letter.toUpperCase());
}


function listProducts() {
    const selectElement = document.getElementById('product');
    
    
    products.sort((a, b) => a.name.localeCompare(b.name));
    
    
    products.forEach(product => {
        let option = document.createElement('option');
        option.value = product.id;
        option.textContent = capitalizeWords(product.name);
        selectElement.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', listProducts);
document.addEventListener('DOMContentLoaded', updateReviewCounter);