const packages = [
  { id: 1, destination: "Paris, France", durationDays: 5, basePrice: 1200, season: "Spring" },
  { id: 2, destination: "Bali, Indonesia", durationDays: 7, basePrice: 1500, season: "Dry Season" },
  { id: 3, destination: "Dubai, UAE", durationDays: 4, basePrice: 1000, season: "Winter" },
  { id: 4, destination: "Maldives", durationDays: 6, basePrice: 1800, season: "Peak Season" }
];

function calculateFinalPrice(basePrice, season) {
  let multiplier = 1.0;

  // Seasonal multiplier
  switch (season.toLowerCase()) {
    case "spring":
      multiplier = 1.1;  // 10% increase
      break;
    case "dry season":
      multiplier = 1.2;  // 20% increase
      break;
    case "winter":
      multiplier = 1.15; // 15% increase
      break;
    case "peak season":
      multiplier = 1.3;  // 30% increase
      break;
    default:
      multiplier = 1.0;
  }

  // Weekend surcharge
  const weekendSurcharge = 0.05;
  const finalPrice = basePrice * multiplier * (1 + weekendSurcharge);

  return finalPrice.toFixed(2);
}

// Render table dynamically
function renderPackages() {
  const tableBody = document.querySelector("#packageTable tbody");
  tableBody.innerHTML = ""; // clear any existing rows

  packages.forEach(pkg => {
    const finalPrice = calculateFinalPrice(pkg.basePrice, pkg.season);
    const row = `
      <tr>
        <td>${pkg.id}</td>
        <td>${pkg.destination}</td>
        <td>${pkg.durationDays} Days</td>
        <td>$${pkg.basePrice}</td>
        <td>${pkg.season}</td>
        <td>$${finalPrice}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Call function on page load
document.addEventListener("DOMContentLoaded", renderPackages);
