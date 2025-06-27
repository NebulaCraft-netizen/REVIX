// === Welcome popup ===
function closePopup() {
  document.getElementById("welcomePopup").style.display = "none";
}

// === Real-time Minecraft player counter ===
const serverIP = "revixmc.net"; // Replace with your actual IP or domain
const playerCountElement = document.getElementById("playerCount");

async function updatePlayerCount() {
  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    const data = await response.json();

    if (data.online && data.players) {
      playerCountElement.textContent = data.players.online;
    } else {
      playerCountElement.textContent = "Offline";
    }
  } catch (error) {
    playerCountElement.textContent = "Error";
    console.error("Player count fetch failed:", error);
  }
}

// Run now and update every 10 seconds
updatePlayerCount();
setInterval(updatePlayerCount, 10000);
