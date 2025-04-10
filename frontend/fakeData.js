// Fake status generator
const statuses = ['empty', 'parking', 'parked'];

function updateFakeSpot(spotNumber) {
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const now = new Date();
  
  // Update circle color, text, and time
  document.getElementById(`fake-light-${spotNumber}`).className = `light ${randomStatus}`;
  document.getElementById(`fake-status-${spotNumber}`).textContent = 
    randomStatus.charAt(0).toUpperCase() + randomStatus.slice(1);
  document.getElementById(`fake-time-${spotNumber}`).textContent = 
    'Last updated: ' + now.toLocaleTimeString();
}

// Auto-cycle between 5 and 10 seconds
setInterval(() => {
  updateFakeSpot(1);
}, Math.floor(5000 * (Math.random() + 1)));

// Put them on seperate timers
setInterval(() => {
  updateFakeSpot(2);
}, Math.floor(5000 * (Math.random() + 1)));

// Initialize
updateFakeSpot(1);
updateFakeSpot(2);