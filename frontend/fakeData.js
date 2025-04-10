// Fake status generator
const statuses = ['empty', 'parking', 'parked'];

function updateFakeSpot(spotNumber) {
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const now = new Date();
  
  // Update DOM
  document.getElementById(`fake-light-${spotNumber}`).className = `light ${randomStatus}`;
  document.getElementById(`fake-status-${spotNumber}`).textContent = 
    randomStatus.charAt(0).toUpperCase() + randomStatus.slice(1);
  document.getElementById(`fake-time-${spotNumber}`).textContent = 
    'Last updated: ' + now.toLocaleTimeString();
}

// Auto-cycle every 5 seconds (optional)
setInterval(() => {
  updateFakeSpot(1);
  updateFakeSpot(2); 
}, 5000);

// Initialize
updateFakeSpot(1);
updateFakeSpot(2);