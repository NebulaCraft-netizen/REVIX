// Update player count from mcstatus.io
function updatePlayerCount() {
  const countElement = document.getElementById("player-count");

  fetch("https://api.mcstatus.io/v2/status/java/play.revixmc.net")
    .then(res => res.json())
    .then(data => {
      countElement.textContent = `Players Online: ${data.players.online}`;
    })
    .catch(() => {
      countElement.textContent = "Players Online: Unable to fetch";
    });
}

updatePlayerCount();
setInterval(updatePlayerCount, 15000); // refresh every 15s

// Google Sign-In Initialization
window.onload = () => {
  google.accounts.id.initialize({
    client_id: "505175354332-c17mnppbe87lpgbqslj68urfajhmung9.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("signin-btn"),
    { theme: "outline", size: "medium" }
  );
};

// Handle sign-in credentials
function handleCredentialResponse(response) {
  const decoded = parseJwt(response.credential);
  const email = decoded.email;

  const adminEmails = ["youremail@example.com", "owneremail@example.com"]; // CHANGE THIS
  if (adminEmails.includes(email)) {
    document.getElementById("admin-section").style.display = "inline-block";
    alert(`✅ Welcome admin: ${decoded.name}`);
  } else {
    alert("✅ Signed in, but not admin.");
  }
}

// Decode JWT
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(atob(base64).split("").map(c =>
    "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(""));
  return JSON.parse(jsonPayload);
}

// Copy IP to clipboard
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("copy-ip").addEventListener("click", () => {
    const serverIP = "play.revixmc.net";
    navigator.clipboard.writeText(serverIP)
      .then(() => {
        const result = document.getElementById("copy-result");
        result.textContent = "✅ Server IP copied!";
        setTimeout(() => result.textContent = "", 2000);
      });
  });
});
