function updatePlayerCount() {
  const count = Math.floor(Math.random() * 100) + 1;
  document.getElementById('playerCount').textContent = count;
}
updatePlayerCount();
setInterval(updatePlayerCount, 5000);
function closePopup() {
  document.getElementById("welcomePopup").style.display = "none";
}

// Player counter (already in your script.js? Keep this too)
const serverIP = "revixmc.net"; // Update if needed
const countSpan = document.getElementById("playerCount");

async function fetchPlayerCount() {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    const data = await res.json();
    if (data.online && data.players) {
      countSpan.textContent = data.players.online;
    } else {
      countSpan.textContent = "Offline";
    }
  } catch (e) {
    countSpan.textContent = "Error";
  }
}

fetchPlayerCount();
setInterval(fetchPlayerCount, 10000);
