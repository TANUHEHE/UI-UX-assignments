const packages = [
  { id: 1, destination: "Paris, France", durationDays: 5, basePrice: 1200, season: "Spring" },
  { id: 2, destination: "Bali, Indonesia", durationDays: 7, basePrice: 1500, season: "Dry Season" },
  { id: 3, destination: "Dubai, UAE", durationDays: 4, basePrice: 1000, season: "Winter" },
  { id: 4, destination: "Maldives", durationDays: 6, basePrice: 1800, season: "Peak Season" }
];


function seasonMultiplier(season){
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
  return multiplier;
}

function calcBaseForPackage(pkg) {
  const weekendSurcharge = 0.05; // example rule
  return Math.round(pkg.basePrice * seasonMultiplier(pkg.season) * (1 + weekendSurcharge));
}

function nightsBetween(a, b) {
  return b-a
}

function guestsMultiplier(guests) {
  return guests > 2 ? 1.2 : 1.0; // +20% if >2 guests
}

function promoAdjustment(subtotal, code) {
  switch ((code || "").trim().toUpperCase()) {
    case "EARLYBIRD": return -0.10 * subtotal; // -10%
    case "WELCOME50": return -50;              // flat 50 off
    default: return 0;
  }
}

function formatCurrency(n) {
  return n > 0 ? `$${n.toLocaleString()}` : "—";
}

function populatePackageSelect() {
  const sel = document.getElementById("package");
  for (const p of packages) {
    const opt = document.createElement("option");
    opt.value = String(p.id);
    opt.textContent = `(${p.destination})`;
    sel.appendChild(opt);
  }
}

function computeEstimate() {
  const sel = document.getElementById("package");
  const checkIn = document.getElementById("checkIn").valueAsDate;
  const checkOut = document.getElementById("checkOut").valueAsDate;
  const guests = Number(document.getElementById("guests").value || 0);
  const promo = document.getElementById("promo").value;
  const totalEl = document.getElementById("total");

  if (!sel.value || !checkIn || !checkOut || guests < 1) {
    totalEl.textContent = "NA";
    return 0;
  }

  if (checkOut <= checkIn) {
    totalEl.textContent = "NA";
    return 0;
  }

  const pkg = packages.find(p => String(p.id) === sel.value);
  const nights = nightsBetween(checkIn, checkOut);
  const perPackage = calcBaseForPackage(pkg);
  let subtotal = perPackage * nights;
  subtotal *= guestsMultiplier(guests);
  subtotal = Math.round(subtotal + promoAdjustment(subtotal, promo));
  totalEl.textContent = formatCurrency(subtotal);
  return subtotal;
}

function validateForm() {
  const form = document.getElementById("bookingForm");
  const validBasics = form.checkValidity();
  const computed = computeEstimate();
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = !(validBasics && computed > 0);
}

document.addEventListener("DOMContentLoaded", () => {
  populatePackageSelect();
  const inputs = ["name","email","package","checkIn","checkOut","guests","promo"]
    .map(id => document.getElementById(id));

  for (const el of inputs) {
    el.addEventListener("input", () => { computeEstimate(); validateForm(); });
    el.addEventListener("change", () => { computeEstimate(); validateForm(); });
  }

  document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const total = computeEstimate();
    if (total > 0) {
      alert("Booking submitted! Total: " + document.getElementById("total").textContent);
    }
  });

  validateForm();
});