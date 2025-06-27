// ==== Welcome Popup ====
function closePopup() {
  const popup = document.getElementById("welcomePopup");
  popup.style.display = "none";
}

// ==== Real-Time Minecraft Player Count ====
const serverIP = "revixmc.net"; // Replace with your actual server IP or domain
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
    console.error("Failed to fetch player count:", error);
  }
}

// Run immediately and refresh every 10 seconds
updatePlayerCount();
setInterval(updatePlayerCount, 10000);
