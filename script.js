function updatePlayerCount() {
  const count = Math.floor(Math.random() * 100) + 1;
  document.getElementById('playerCount').textContent = count;
}
updatePlayerCount();
setInterval(updatePlayerCount, 5000);
