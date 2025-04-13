// Fake status generator
const statuses = ['empty', 'parking', 'parked', 'off'];

function updateFakeSpot(spotNumber) {
  let randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const now = new Date();

  // If random is the same as current, switch it
  while (`light ${randomStatus}` == document.getElementById(`fake-light-${spotNumber}`).className) {
    randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  }
  
  // Update circle color, text, and time
  document.getElementById(`fake-light-${spotNumber}`).className = `light ${randomStatus}`;
  document.getElementById(`fake-status-${spotNumber}`).textContent = 
    randomStatus.charAt(0).toUpperCase() + randomStatus.slice(1);
  document.getElementById(`fake-time-${spotNumber}`).textContent = 
    'Last updated: ' + now.toLocaleTimeString();
}

// Cycle between 5 and 10 seconds
function cycle(fakeSpotNumber) {
  setInterval(() => {
    updateFakeSpot(fakeSpotNumber);
  }, Math.floor(5000 * (Math.random() + 1)));
}

// Put them on seperate timers
cycle(1);
cycle(2);

// Initialize
updateFakeSpot(1);
updateFakeSpot(2);