```

---

📄 `style.css` (inside `/public`):
```css
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.container {
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

span {
  color: #00ffff;
  font-weight: bold;
}

.google-button,
.logout-button {
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #4285F4;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
}

.google-button:hover,
.logout-button:hover {
  background-color: #357ae8;
}
```

---

📄 `script.js` (inside `/public`):
```js
const serverIP = "revixmc.net"; // Replace with your actual IP
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
  }
}

updatePlayerCount();
setInterval(updatePlayerCount, 10000);
