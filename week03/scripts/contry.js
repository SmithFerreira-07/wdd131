const year = new Date().getFullYear();
document.getElementById("currentyear").textContent = year;
const lastModification = document.lastModified;
document.getElementById("modification").textContent = lastModification;


const A = 13.12;
const B = 0.6215;
const C = 11.37;
const D = 0.3965;

function calculateWindChill(temp, windSpeed) {
    if (temp > 10 || windSpeed <= 4.8) return null;
  
    const result = A + (B * temp) - (C * Math.pow(windSpeed, 0.16)) + (D * temp * Math.pow(windSpeed, 0.16));
    
   
    return `${result.toFixed(1)}°C`;
  }

const windChill = calculateWindChill(10, 18)

document.getElementById("windChillValue").textContent = windChill;
